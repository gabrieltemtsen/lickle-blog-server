import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './models/user.model';
import { userRole } from './user-role.enum';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from '../auth/login-user.dto';
import { Payload } from 'src/auth/payload';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>
  ){}

  async findById(id: any) {
    const user = this.userModel.findOne({id})
    return user
  }
 
  //register a user
  // async findUser(email: string) {
    
  //   return this.userModel.findOne({email: email})
  // }

  async registerUser(createUserDto: CreateUserDto) {

    try{
      const alreadyExist = await this.userModel.findOne({email: createUserDto.email})
      if(alreadyExist) {
        throw new UnauthorizedException("Account Exists please Login")
      }else{
        const {name, email , password} = createUserDto;
        const newUser = new this.userModel(createUserDto);
        const saltRounds = 10;
        newUser.name = name;
        newUser.email = email;
        newUser.password = await bcrypt.hash(createUserDto.password, saltRounds);
        newUser.role = userRole.reader
        await newUser.save(); 
               
  }
      } catch(err){
        return err
        console.log(err)
      }
    } 

    async loginUser(login: LoginUserDto) {
      const {email, password} = login
      const user = await this.userModel.findOne({email})
      if(!user){
        throw new UnauthorizedException('users doesnt exist')
      }
      const isMatch = bcrypt.compareSync(password, user.password);
      if(!isMatch) {
        throw new UnauthorizedException("Email or password incorrect")
      }
      
      return user
      
    }
    async findByPayload(payload: Payload) {
      const { email } = payload;
      return await this.userModel.findOne({ email });
    }
    
    
    async getUsers() {
      return await this.userModel.find({})
    }
    
 
}

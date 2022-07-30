import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from '../auth/login-user.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('auth')
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService,
        
      ) {}

  @Post('/register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
  
    const user = await this.usersService.registerUser(createUserDto);
    const payload = {
      email: user.email,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }
  @Post('login')
  async loginUser(@Body() loginUserdto: LoginUserDto){
    const user = await this.usersService.loginUser(loginUserdto)
    //  this.userService.findByLogin(UserDTO);
      const payload = {
        email: user.email,
      };
      const token = await this.authService.signPayload(payload);
      return { user, token};
  }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}

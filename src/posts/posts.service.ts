import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/users/models/user.model';
import { UsersService } from 'src/users/users.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostDocument } from './models/post.model';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';


@Injectable()
export class PostsService {
  constructor(
    @Inject(REQUEST) private req: Request,
    @InjectModel('post') private readonly postModel: Model<PostDocument>,
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
    private cloudinary: CloudinaryService,
    private usersService: UsersService
  ){}

  // async getUserById(id: any):  {
  //   const found = await this.usersService.findOne(id);

  //   if (!found) {
  //     throw new NotFoundException(`Task with ID "${id}" not found`);
  //   }

  //   return found;
  // }
  async findUserById(id: any) {
    return await this.usersService.findById(id)
  }

  async uploadImageToCloudinary(file: Express.Multer.File) {
    return await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
  }

  async createPost(createPostDto: CreatePostDto) {
    const { id } = this.req.user as UserDocument;
    const {title, description, image, body, comments,likes,user_id} = createPostDto;
    const post = new this.postModel({
      user_id: id,
      title,
      description,
      image,
      body,
      comments,
      likes
    });
    // post.title = title;
    // post.description = description;
    // post.image = image;
    // post.body = body;
    // post.comments = comments;
    // post.likes = likes
    // post.user_id = user_id
    

    await post.save();
    return 'Post Created';
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}

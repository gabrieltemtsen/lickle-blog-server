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
import { ConfigService } from '@nestjs/config';
const Cloudinary = require('cloudinary').v2



@Injectable()
export class PostsService {
  constructor(
    @Inject(REQUEST) private req: Request,
    @InjectModel('post') private readonly postModel: Model<PostDocument>,
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
    private usersService: UsersService,
    private configService: ConfigService,
    
  ){ }

  async findUserById(id: any) {
    return await this.usersService.findById(id)
  }

  async createPost(createPostDto: CreatePostDto) {
    const { id } = this.req.user as UserDocument;
    const {title, description, image_url, cloudinary_id, body, user_id} = createPostDto;
    const post = new this.postModel({
      user_id: id,
      title,
      description,
      image_url,
      body,
      cloudinary_id,
    });
    

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

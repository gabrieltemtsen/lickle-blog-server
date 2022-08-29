/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/users/models/user.model';
import { UsersService } from 'src/users/users.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostDocument } from './models/post.model';

@Injectable()
export class PostsService {
  constructor(
    @Inject(REQUEST) private req: Request,
    @InjectModel('post') private readonly postModel: Model<PostDocument>,
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
    private usersService: UsersService,
  ) {}

  async findUserById(id: any) {
    const getAuthor = await this.userModel.findById(id);
    const author = getAuthor.name;
    return author;
  }

  async createPost(createPostDto: CreatePostDto) {
    const { id } = this.req.user as UserDocument;
    const {
      title,
      description,
      image_url,
      cloudinary_id,
      body,
      user_id,
      category,
    } = createPostDto;
    const post = new this.postModel({
      user_id: id,
      title,
      description,
      category,
      image_url,
      body,
      cloudinary_id,
    });

    await post.save();
    return 'Post Created';
  }

  getPosts(options) {
    return this.postModel.find(options);
  }
  async findPostByID(id) {
    return await this.postModel.findById(id);
  }
  count(options) {
    return this.postModel.count(options).exec();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} post`;
  // }

  // update(id: number, updatePostDto: UpdatePostDto) {
  //   return `This action updates a #${id} post`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} post`;
  // }
}

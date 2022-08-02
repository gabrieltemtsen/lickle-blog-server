import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDocument } from 'src/posts/models/post.model';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentDocument } from './models/comment.model';
import { UserDocument } from 'src/users/models/user.model';


@Injectable()

export class CommentsService {
  constructor(
    @Inject(REQUEST) private req: Request,
    @InjectModel('comment') private readonly commentModel: Model<CommentDocument>,
    @InjectModel('post') private readonly postModel: Model<PostDocument>,
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ){}
  async create(createCommentDto: CreateCommentDto) {
    console.log(this.req.user)
    const {post_id, user_id, comment} = createCommentDto;
    const newComment = new this.commentModel(createCommentDto);
    const res = await newComment.save();

    return 'Comment Added!';
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}

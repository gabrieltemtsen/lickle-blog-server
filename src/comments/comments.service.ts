/* eslint-disable @typescript-eslint/no-unused-vars */
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
    @InjectModel('comment')
    private readonly commentModel: Model<CommentDocument>,
    @InjectModel('post') private readonly postModel: Model<PostDocument>,
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}
  async create(createCommentDto: CreateCommentDto) {
    const { id } = this.req.user as UserDocument;

    const { post_id, comment } = createCommentDto;

    const newComment = new this.commentModel({
      user_id: id,
      post_id,
      comment,
    });
    const res = await newComment.save();

    return 'Comment Added!';
  }

  findAll() {
    return `This action returns all comments`;
  }
  async findUserById(id: any) {
    const getAuthor = await this.userModel.findById(id);
    const author = getAuthor.name;
    return author;
  }

  async getComments(id: string) {
    const comments = await this.commentModel.find({
      post_id: id,
    });
    // const totalComments = await comments.count();
    return { comments };
  }
  async getNumberOfComments(id: string) {
    const comments = this.commentModel.find({
      post_id: id,
    });
    comments.count();
    return comments;
  }

  editComment(id: string, updateCommentDto: UpdateCommentDto) {
    const { comment } = updateCommentDto;
    return this.commentModel.findByIdAndUpdate(id, updateCommentDto);
  }

  deleteComment(id: string) {
    return this.commentModel.findByIdAndDelete(id);
  }
}

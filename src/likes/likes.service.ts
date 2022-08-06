import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDocument } from 'src/posts/models/post.model';
import { UserDocument } from 'src/users/models/user.model';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { LikeDocument } from './models/like.model';

@Injectable()
export class LikesService {
  constructor(
    @Inject(REQUEST) private req: Request,
    @InjectModel('like') private readonly likeModel: Model<LikeDocument>,
    @InjectModel('post') private readonly postModel: Model<PostDocument>,
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}

  async createLike(createLikeDto: CreateLikeDto) {
    const { id } = this.req.user as UserDocument;
    const { post_id } = createLikeDto;

    const find = await this.likeModel.findOne({
      post_id: post_id,
      user_id: id,
    });
    console.log(find);
    console.log(this.req.user);
    if (find === null) {
      const like = new this.likeModel({
        user_id: id,
        post_id,
      });
      await like.save();
      return 'Like added';
    } else {
      return 'likedAlready';
    }
  }

  async deleteLike(id: string) {
    return await this.likeModel.findByIdAndDelete(id);
  }

  async getPostLikes(id: string) {
    const likedPost = this.likeModel.find({
      post_id: id,
    });
    const likes = likedPost.count();
    return likedPost;
  }

  // findAll() {
  //   return `This action returns all likes`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} like`;
  // }

  // update(id: number, updateLikeDto: UpdateLikeDto) {
  //   return `This action updates a #${id} like`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} like`;
  // }
}

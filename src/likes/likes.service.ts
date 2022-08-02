import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { LikeDocument } from './models/like.model';

@Injectable()
export class LikesService {
  constructor(
    @InjectModel('like') private readonly likeModel: Model<LikeDocument>,
  ){}

  createLike(createLikeDto: CreateLikeDto) {
    const{post_id,user_id} = createLikeDto;
    const d = 1;

    const like = new this.likeModel(createLikeDto)
     like.user_id = user_id;
     like.post_id = post_id;

     like.save()

    return 'This action adds a new like';
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

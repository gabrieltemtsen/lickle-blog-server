import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LikeSchema } from './models/like.model';
import { UsersModule } from 'src/users/users.module';
import { PostSchema } from 'src/posts/models/post.model';
import { UserSchema } from 'src/users/models/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'like', schema:LikeSchema},
      {name: 'post', schema:PostSchema},
      {name: 'user', schema:UserSchema}
    ]),
    UsersModule,

  ],
  controllers: [LikesController],
  providers: [LikesService]
})
export class LikesModule {}

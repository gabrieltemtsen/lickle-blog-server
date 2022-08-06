import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './models/comment.model';
import { PostSchema } from 'src/posts/models/post.model';
import { UsersModule } from 'src/users/users.module';
import { UserSchema } from 'src/users/models/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'comment', schema: CommentSchema },
      { name: 'post', schema: PostSchema },
      { name: 'user', schema: UserSchema },
    ]),
    UsersModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}

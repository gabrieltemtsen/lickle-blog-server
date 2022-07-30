import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { PaymentsModule } from './payments/payments.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost/lickle-blog'
    ),
    UsersModule, 
    PostsModule, 
    PaymentsModule, CommentsModule, LikesModule, AuthModule],
  
})
export class AppModule {}

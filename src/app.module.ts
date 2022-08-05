import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { PaymentsModule } from './payments/payments.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UtilityModule } from './utility/utility.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost/lickle-blog'
    ),
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal: true
    }),
    UsersModule, 
    PostsModule, 
    PaymentsModule, CommentsModule, LikesModule, AuthModule, UtilityModule],
  
})
export class AppModule {}

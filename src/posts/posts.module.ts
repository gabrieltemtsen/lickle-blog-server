import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './models/post.model';

@Module({
  imports:[
    MongooseModule.forFeature([{name: 'post', schema:PostSchema}])

  ],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}

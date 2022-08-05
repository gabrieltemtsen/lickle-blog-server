import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './models/post.model';
import { UsersModule } from 'src/users/users.module';
import { UserSchema } from 'src/users/models/user.model';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name: 'post', schema:PostSchema},
      {name: 'user', schema:UserSchema}
    ]),
    UsersModule,
    CloudinaryModule,

  ],
  controllers: [PostsController],
  providers: [PostsService,]
})
export class PostsModule {}

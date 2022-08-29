/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Inject,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(
    @Inject(REQUEST) private req: Request,
    private readonly postsService: PostsService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto);
  }

  @Get()
  async findAll(@Req() req: Request) {
    let options = {};
    if (req.query.s) {
      options = {
        $or: [
          { title: new RegExp(req.query.s.toString(), 'i') },
          { description: new RegExp(req.query.s.toString(), 'i') },
          { category: new RegExp(req.query.s.toString(), 'i') },
        ],
      };
    }
    const query = this.postsService.getPosts(options);

    const page: number = parseInt(req.query.page as any) || 1;
    const limit = 9;
    const total = await this.postsService.count(options);

    const data = await query
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return { data, total, page, last_page: Math.ceil(total / limit) };
  }

  @Get('author/:id')
  findOne(@Param('id') id: string) {
    return this.postsService.findUserById(id);
  }
  @Get('post/:id')
  findPost(@Param('id') id: string) {
    return this.postsService.findPostByID(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
  //   return this.postsService.update(+id, updatePostDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.postsService.remove(+id);
  // }
}

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
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createLikeDto: CreateLikeDto) {
    return this.likesService.createLike(createLikeDto);
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteLike(@Param('id') id: string) {
    return this.likesService.deleteLike(id);
  }

  @Get(':id')
  getPostLikes(@Param('id') id: string) {
    return this.likesService.getPostLikes(id);
  }

  // @Get()
  // findAll() {
  //   return this.likesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.likesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLikeDto: UpdateLikeDto) {
  //   return this.likesService.update(+id, updateLikeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.likesService.remove(+id);
  // }
}

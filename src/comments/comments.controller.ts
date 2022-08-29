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
import { AuthGuard } from '@nestjs/passport';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id') //get comment of a post
  getComments(@Param('id') id: string) {
    return this.commentsService.getComments(id);
  }
  @Get('author/:id') //get comment of a post
  getCommentAuthor(@Param('id') id: string) {
    return this.commentsService.findUserById(id);
  }

  @Get('comment/:id') //get comment of a post
  getNumberOfComments(@Param('id') id: string) {
    return this.commentsService.getNumberOfComments(id);
  }

  @Patch(':id')
  editComment(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.editComment(id, updateCommentDto);
  }

  @Delete(':id')
  deleteComment(@Param('id') id: string) {
    return this.commentsService.deleteComment(id);
  }
}

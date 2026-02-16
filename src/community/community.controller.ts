import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CommunityService } from './community.service';

@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Get('posts')
  getPosts() {
    return this.communityService.getPosts();
  }

  @Get('posts/:id')
  getPost(@Param('id') id: string) {
    return this.communityService.getPost(id);
  }

  @Post('posts')
  createPost(@Body() postData: any) {
    return this.communityService.createPost(postData);
  }
}

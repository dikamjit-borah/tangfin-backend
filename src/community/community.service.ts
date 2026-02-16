import { Injectable } from '@nestjs/common';

@Injectable()
export class CommunityService {
  getPosts() {
    return [
      { id: '1', title: 'Welcome to the community', author: 'Admin' },
      { id: '2', title: 'Getting started guide', author: 'User1' },
    ];
  }

  getPost(id: string) {
    return { id, title: `Post ${id}`, content: 'This is a dummy post', author: 'User' };
  }

  createPost(postData: any) {
    return { message: 'Post created', post: { id: '3', ...postData } };
  }
}

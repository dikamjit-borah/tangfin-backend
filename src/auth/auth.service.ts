import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login(credentials: { email: string; password: string }) {
    return { token: 'dummy-jwt-token', user: { email: credentials.email } };
  }

  register(userData: { email: string; password: string; name: string }) {
    return { message: 'User registered successfully', user: { email: userData.email, name: userData.name } };
  }
}

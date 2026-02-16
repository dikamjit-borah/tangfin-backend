import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import { FirebaseService } from '../common/services/firebase.service';
import { User } from './schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private firebaseService: FirebaseService,
  ) {}

  async login(loginDto: { idToken: string }) {
    try {
      // Verify Firebase ID token
      const decodedToken = await this.firebaseService.verifyIdToken(
        loginDto.idToken,
      );
      const firebaseUid = decodedToken.uid;

      // Check if user exists in database
      let user = await this.userModel.findOne({ firebaseUid });

      if (!user) {
        // Create new user with nanoid
        const userId = nanoid();
        user = await this.userModel.create({
          userId,
          firebaseUid,
          email: decodedToken.email,
          displayName: decodedToken.name,
          photoURL: decodedToken.picture,
          phoneNumber: decodedToken.phone_number,
        });
      }

      return {
        userId: user.userId,
        firebaseUid: user.firebaseUid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid Firebase token');
    }
  }
}

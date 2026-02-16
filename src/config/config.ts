import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(__dirname, '..', '..', '.env') });

export const config = {
  app: {
    name: process.env.APP_NAME || 'tailfin-backend',
    port: parseInt(process.env.PORT || '3001', 10),
    env: process.env.NODE_ENV || 'development',
  },
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/tailfin',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    expiresIn: process.env.JWT_EXPIRATION || '7d',
  },
  logging: {
    level: process.env.LOG_LEVEL || 'debug',
    maxFiles: process.env.LOG_MAX_FILES || '14',
  },
   firebase: (() => {
    try {
      if (!process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
        return null;
      }
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
      // Fix escaped newlines in private_key
      if (serviceAccount.private_key) {
        serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
      }
      return serviceAccount;
    } catch (error) {
      console.error('Invalid FIREBASE_SERVICE_ACCOUNT_JSON:', error);
      return null;
    }
  })(),
};

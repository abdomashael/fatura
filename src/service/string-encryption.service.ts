import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export default class StringEncryptionService {
  saltOrRounds = 10;

  async compare(str: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(str, hashed);
  }

  async hash(str: string): Promise<string> {
    return await bcrypt.hash(str, this.saltOrRounds);
  }
}

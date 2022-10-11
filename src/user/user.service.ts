import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async all(): Promise<User[]> {
    return this.userRepository.find();
  }
  async create(data: any): Promise<User> {
    return this.userRepository.save(data);
  }
  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({email});
  }

  async findOneById(id: number): Promise<User> {
    return this.userRepository.findOneBy({id});
  }
}

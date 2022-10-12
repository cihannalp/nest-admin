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

  async paginate(page: number = 1): Promise<any> {
    const take = 1;

    const [users, total] = await this.userRepository.findAndCount({
      take,
      skip: (page - 1) * take,
    });

    return {
      data: users,
      meta: {
        total,
        page,
        last_page: Math.ceil(total / take),
      },
    };
  }
  async create(data: any): Promise<User> {
    return this.userRepository.save(data);
  }
  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  async findOneById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: number, data): Promise<any> {
    return this.userRepository.update(id, data);
  }

  async delete(id: number): Promise<any> {
    return this.userRepository.delete(id);
  }
}

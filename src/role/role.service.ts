import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './models/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async all(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async create(data: any): Promise<Role> {
    return this.roleRepository.save(data);
  }
  async findOneByName(name: string): Promise<Role> {
    return this.roleRepository.findOneBy({ name });
  }

  async findOneById(id: number): Promise<Role> {
    return this.roleRepository.findOneBy({ id });
  }

  async update(id: number, data): Promise<any> {
    return this.roleRepository.update(id, data);
  }

  async delete(id: number): Promise<any> {
    return this.roleRepository.delete(id);
  }
}

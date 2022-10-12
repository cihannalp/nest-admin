import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Column } from 'typeorm';

export class UserCreateDto {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  email: string;

  @Exclude()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @Column()
  role_id: number;
}

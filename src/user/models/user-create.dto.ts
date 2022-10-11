import { Exclude } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class UserCreateDto {
    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;

    @Exclude()
    @IsNotEmpty()
    email: string;
}
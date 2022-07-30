import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { userRole } from "../user-role.enum";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
    role: userRole.reader;
}

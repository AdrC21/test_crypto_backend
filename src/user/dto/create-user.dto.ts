import { ApiProperty} from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength} from "class-validator";

export class CreateUserDto {

    @ApiProperty({ type:'string', name:'email', default:'example@gmail.com' })
    @IsString()
    @IsNotEmpty()
    email:string

    @ApiProperty({ type:'string', name:'password', default:'12345678' })
    @IsString()
    @IsNotEmpty()
    @MinLength(8, { message: 'Contraseña de minimo 8 caracteres' })
    password:string

}

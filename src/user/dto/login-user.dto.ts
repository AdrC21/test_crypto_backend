import { ApiProperty} from "@nestjs/swagger";
import { IsNotEmpty, IsString} from "class-validator";

export class LoginDto {

    @ApiProperty({ type:'string', name:'email', default:'example@gmail.com' })
    @IsString()
    @IsNotEmpty()
    email:string

    @ApiProperty({ type:'string', name:'password', default:'12345678' })
    @IsString()
    @IsNotEmpty()
    password:string

}

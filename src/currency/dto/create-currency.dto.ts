import { ApiProperty} from "@nestjs/swagger";
import { IsAlphanumeric, IsNotEmpty, IsString, Length, MinLength} from "class-validator";

export class CreateCurrencyDto {

    @ApiProperty({ type:'string', name:'cod', default:'USD' })
    @IsString()
    @IsNotEmpty()
    @Length(3, 3, { message: 'El código de moneda debe tener 3 caracteres (ej. USD)' })
    @IsAlphanumeric()
    cod:string

    @ApiProperty({ type:'string', name:'name', default:'Dolares Estadounidense' })
    @IsString()
    @IsNotEmpty()
    name:string

    @ApiProperty({ type:'string', name:'symbol', default:'$' })    
    @IsNotEmpty()
    @IsString()
    symbol: string
}

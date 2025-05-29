import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, ArrayMinSize} from 'class-validator';

export class CreateCryptocurrencyDto {
    
    @ApiProperty({ type:'string', name:'symbol', default:'BIT' })    
    @IsNotEmpty()
    @IsString()
    symbol: string;

    @ApiProperty({ type:'string', name:'name', default:'Bitcoin' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ type:'string', name:'monedas', default: [1] })    
    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1, { message: 'Se debe asociar al menos una moneda' })
    monedas: number[];
}
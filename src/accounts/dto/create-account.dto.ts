import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ENUM_SERVER } from "../entity/enumserver";
import { ENUM_STATUS } from "../entity/enumstatus";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAccountDto {

    @ApiProperty({
        description: 'Nick of the account',
        example: 'JohnDoe',
    })
    @IsNotEmpty()
    @IsString()
    nick: string;

    @ApiProperty({
        description: 'Server of the account',
        example: 'BR',
    })
    @IsNotEmpty()
    @IsString()
    server: ENUM_SERVER;

    @ApiProperty({
        description: 'Level of the account',
        example: 100,
    })
    @IsNotEmpty()
    @IsNumber()
    level: number;

    @ApiProperty({
        description: 'Elo of the account',
        example: 'Diamond',
    })
    @IsNotEmpty()
    @IsString()
    elo: string;

    @ApiProperty({
        description: 'Champions of the account',
        example: 100,
    })
    @IsNotEmpty()
    @IsNumber()
    champions: number;

    @ApiProperty({
        description: 'Skins of the account',
        example: 100,
    })
    @IsNotEmpty()
    @IsNumber()
    skins: number;

    @ApiProperty({
        description: 'Price of the account',
        example: 100,
    })
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @ApiProperty({
        description: 'Status of the account',
        example: 'Available',
    })
    
    @IsNotEmpty()
    @IsString()
    status: ENUM_STATUS;

    @ApiProperty({
        description: 'Last activity of the account',
        example: '2021-01-01',
    })
    @IsNotEmpty()
    @IsDate()
    lastActivity: Date;

}
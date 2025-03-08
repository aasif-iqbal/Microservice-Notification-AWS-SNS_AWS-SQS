import { IsString } from "class-validator";  

export class EmailInput{
    @IsString()
    to: string; // to email

    @IsString()
    name:string; // Customer name
    
    @IsString()
    order_number: string; // order number
}
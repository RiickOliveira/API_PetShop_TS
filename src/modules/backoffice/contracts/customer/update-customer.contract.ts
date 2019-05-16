import { Contract } from "../contract";
import { Flunt } from "src/utils/flunt";
import { Injectable } from "@nestjs/common";
import { UpdateCustomerDto } from "../../DTOs/customer/update-customer.dto";

@Injectable()
export class UpdateCustomerContract implements Contract {
    errors: any[];   
    
    validate(model: UpdateCustomerDto): boolean {
        const flunt = new Flunt();

        flunt.hasMinLen(model.name, 5, 'Nome Invalido');       

        this.errors = flunt.errors;
        return flunt.isValid()
    }


}
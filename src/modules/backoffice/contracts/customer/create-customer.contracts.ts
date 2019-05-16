import { Contract } from "../contract";
import { Flunt } from "src/utils/flunt";
import { Injectable } from "@nestjs/common";
import { CreateCustomerDto } from "../../DTOs/customer/create-customer.dto";

@Injectable()
export class CreateCustomerContract implements Contract {
    errors: any[];   
    
    validate(model: CreateCustomerDto): boolean {
        const flunt = new Flunt();

        flunt.hasMinLen(model.name, 5, 'Nome Invalido');
        flunt.isEmail(model.email,'Email invalido');
        flunt.isFixedLen(model.document,11,'CPF invalido');
        flunt.hasMinLen(model.password,6,'Senha inválida')

        //this.errors.push({}) // return this.erros.length === 0

        this.errors = flunt.errors;
        return flunt.isValid()
    }


}
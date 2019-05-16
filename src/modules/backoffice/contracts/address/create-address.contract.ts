import { Contract } from "../contract";
import { Flunt } from "src/utils/flunt";
import { Injectable } from "@nestjs/common";
import { Adress } from "src/modules/backoffice/models/adress.model";

@Injectable()
export class CreateAddressContract implements Contract {
    errors: any[];   
    
    validate(model: Adress): boolean {
        const flunt = new Flunt();
        console.log(model)
        flunt.isFixedLen(model.zipCode, 8, 'CEP invalido');
        flunt.hasMinLen(model.street, 3,'Rua invalida');
        flunt.hasMinLen(model.neighborhood, 3,'Bairro invalido');
        flunt.hasMinLen(model.city, 3, 'Cidade Invalida');
        flunt.isFixedLen(model.state, 2, 'Estado Invalido');
        flunt.isFixedLen(model.country, 3, 'País Invalido');

        //this.errors.push({}) // return this.erros.length === 0

        this.errors = flunt.errors;
        return flunt.isValid()
    }


}
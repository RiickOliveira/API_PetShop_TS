import { Contract } from "../contract";
import { Flunt } from "src/utils/flunt";
import { Injectable } from "@nestjs/common";
import { Pet } from "src/modules/backoffice/models/pet.model";

@Injectable()
export class CreatePetsContract implements Contract {
    errors: any[];   
    
    validate(model: Pet): boolean {
        const flunt = new Flunt();

        flunt.hasMinLen(model.name, 2, 'Nome Invalido');
        flunt.hasMinLen(model.gender, 3, 'Genero Invalido');
        flunt.hasMinLen(model.kind, 3, 'Tipo Invalido');
        flunt.hasMinLen(model.brand, 3, 'Raça Invalida');
        
        //this.errors.push({}) // return this.erros.length === 0

        this.errors = flunt.errors;
        return flunt.isValid()
    }


}
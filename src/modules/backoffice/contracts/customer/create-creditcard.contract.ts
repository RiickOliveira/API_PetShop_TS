import { Injectable } from "@nestjs/common";
import { Contract } from "../contract";
import { CreditCard } from "../../models/creditCard.model";
import { Flunt } from "src/utils/flunt";

@Injectable()
export class CreateCreditCardContract implements Contract {
    errors: any[]

    validate(model: CreditCard):boolean {
        const flunt = new Flunt();

        flunt.hasMinLen(model.holder, 5, 'Nome no cartão inválido');
        flunt.isFixedLen(model.number, 16, 'Número do cartão inválido');
        flunt.isFixedLen(model.expiration, 4, 'Data de expiração do cartao inválida');

        this.errors = flunt.errors;
        return flunt.isValid();
    }
}
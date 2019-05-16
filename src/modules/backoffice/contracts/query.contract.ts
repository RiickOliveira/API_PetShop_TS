import { Injectable } from "@nestjs/common";
import { Contract } from "./contract";
import { QueryDto } from "../DTOs/query.dto";
import { Flunt } from "src/utils/flunt";

@Injectable()
export class QueryContract implements Contract {
    errors: any[];

    validate(model: QueryDto) {
        const flunt = new Flunt();

        if (!model.query) model.query = {};

        flunt.isGreaterThan(model.take, 1000, 'Sua query nao pode retornar  mais que 1000 registros');

        this.errors = flunt.errors;
        return flunt.isValid();
    }
}
import { Controller, Post, Put, Param, Body, UseInterceptors, HttpException, HttpStatus } from "@nestjs/common";
import { Result } from "../models/result.model";
import { ValidatorInterceptor } from "src/interceptors/validator.interceptor";
import { CreatePetsContract } from "../contracts/Pet/create-pet.contract";
import { Pet } from "../models/pet.model";
import { PetsService } from "../services/pets.service";

@Controller('v1/pets')
export class PetsController {
    constructor(
        private readonly service: PetsService,        
    ) { }      

    @Post(':document')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetsContract()))
    async createPet(@Param('document') document, @Body() model: Pet) {
        try {
            const result = await this.service.create(document, model);
            return new Result("Pet adicionado com sucesso", true, result, null)

        } catch (error) {
            throw new HttpException(new Result("Não foi possivel criar seu pet", false, null, error), HttpStatus.BAD_REQUEST);
        }
    }   

    @Put(':document/:id')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetsContract()))
    async updatePet(@Param('document') document, @Param('id') id, @Body() model: Pet) {
        try {
            return new Result("Pet atualizado com sucesso", true, model, null);
        } catch (error) {
            throw new HttpException(new Result("Nao foi possivel atualizar o Pet", false, null, error), HttpStatus.BAD_REQUEST);
        }
    }   

}
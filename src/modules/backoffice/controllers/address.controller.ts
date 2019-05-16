import { Controller, Post, Param, Body, UseInterceptors, HttpException, HttpStatus } from "@nestjs/common";
import { Result } from "../models/result.model";
import { ValidatorInterceptor } from "src/interceptors/validator.interceptor";
import { Adress } from "../models/adress.model";
import { CreateAddressContract } from "../contracts/Address/create-address.contract";
import { AddressService } from "../services/adress.service";
import { AddresType } from "../enums/address-type.enum";

@Controller('v1/addresses')
export class AddressController {
    constructor(       
        private readonly service: AddressService
    ) { }    

    @Post(':document/billing')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async  addBillingAddress(@Param('document') document, @Body() model: Adress) {
        try {
            await this.service.create(document, model, AddresType.Billing);
            return model;
        } catch (error) {
            throw new HttpException(new Result("Não foi possivel adicionar o seu endereço", false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post(':document/shipping')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async  addShippingAddress(@Param('document') document, @Body() model: Adress) {
        try {
            await this.service.create(document, model, AddresType.Shipping);
            return model;
        } catch (error) {
            throw new HttpException(new Result("Não foi possivel adicionar o seu endereço de entrega", false, null, error), HttpStatus.BAD_REQUEST);
        }
    }   
}
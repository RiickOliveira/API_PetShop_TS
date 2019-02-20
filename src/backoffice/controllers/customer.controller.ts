import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors } from "@nestjs/common";
import { Customer } from "../models/customer.model";
import { Result } from "../models/result.model";
import { ValidatorInterceptor } from "src/interceptors/validator.interceptor";
import { CreateCustomerContract } from "../contracts/customer.contracts";
import { CreateCustomerDto } from "../DTOs/create-customer.dto";

@Controller('v1/customers')
export class CustomerController {

    @Get()
    get() {
        return new Result(null, true, [], null);
    }

    @Get(':document')
    getById(@Param('document') document) {
        return new Result(null, true, {}, null);
    }

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
    post(@Body() body: CreateCustomerDto) {
        return new Result('Cliente criado com exito', true, body, null);
    }

    @Put(':document')
    put(@Param('document') document,@Body() body) {
        return new Result('Cliente atualizado com exito', true, body, null);
    }

    @Delete(':document')
    delete() {
        return new Result('Cliente removido com exito', true, null, null);
    }

}
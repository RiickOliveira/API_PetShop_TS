import { Controller, Get, Post, Delete, Param, Body, UseInterceptors, HttpException, HttpStatus, Put } from "@nestjs/common";
import { Customer } from "../models/customer.model";
import { Result } from "../models/result.model";
import { ValidatorInterceptor } from "src/interceptors/validator.interceptor";
import { CreateCustomerContract } from "../contracts/Customer/create-customer.contracts";
import { CreateCustomerDto } from "../DTOs/customer/create-customer.dto";
import { AccountService } from "../services/account.services";
import { User } from "../models/user.model";
import { CustomerService } from "../services/customer.service";
import { QueryDto } from "../DTOs/query.dto";
import { UpdateCustomerContract } from "../contracts/customer/update-customer.contract";
import { UpdateCustomerDto } from "../DTOs/customer/update-customer.dto";
import { CreateCreditCardContract } from "../contracts/customer/create-creditcard.contract";
import { CreditCard } from "../models/creditCard.model";
import { QueryContract } from "../contracts/query.contract";

@Controller('v1/customers')
export class CustomerController {
    constructor(
        private readonly accountService: AccountService,
        private readonly customerService: CustomerService
    ) { }

    @Get()
    async getAll() {
        const customers = await this.customerService.findAll();
        return new Result(null, true, customers, null);
    }

    @Get(':document')
    async get(@Param('document') document) {
        const customer = await this.customerService.find(document);
        return new Result(null, true, customer, null);
    }

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
    async post(@Body() model: CreateCustomerDto) {
        try {
            const user = await this.accountService.create(new User(model.document, model.password, true))

            const customer = new Customer(model.name, model.document, model.email, null, null, null, null, user);
            const result = await this.customerService.create(customer)

            return new Result('Cliente criado com exito', true, result, null);

        } catch (error) {
            throw new HttpException(new Result('Não foi possivel realizar seu cadastro', false, null, error), HttpStatus.BAD_REQUEST)
        }
    }      

    @Post('query')
    @UseInterceptors(new ValidatorInterceptor(new QueryContract()))
    async query(@Body() model: QueryDto) {
        const customers = await this.customerService.query(model);
        return new Result(null,true,customers,null);
    }

    @Put(':document')
    @UseInterceptors(new ValidatorInterceptor(new UpdateCustomerContract()))
    async update(@Param('document') document, @Body() model: UpdateCustomerDto){
        try {
            await this.customerService.update(document, model);
            return new Result('Atualizado com sucesso', true, model, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possivel atualizar o cliente',false,null,error),HttpStatus.BAD_REQUEST);
        }
    }

    @Post(':document/credit-cards')
    @UseInterceptors(new ValidatorInterceptor(new CreateCreditCardContract()))
    async createCreditCard(@Param('document') document, @Body() model: CreditCard) {
        try {
            await this.customerService.saveOrUpdateCreditcard(document, model);
            return new Result('null',true,model, null)
        } catch (error) {
            throw new HttpException(new Result('Não foi possivel adicionar seu cartao de credito',false,null,error), HttpStatus.BAD_REQUEST);
        }
    }


    @Delete(':document')
    delete() {
        return new Result('Cliente removido com exito', true, null, null);
    }

}
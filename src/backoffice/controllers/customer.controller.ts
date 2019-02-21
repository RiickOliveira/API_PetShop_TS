import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, HttpException, HttpStatus } from "@nestjs/common";
import { Customer } from "../models/customer.model";
import { Result } from "../models/result.model";
import { ValidatorInterceptor } from "src/interceptors/validator.interceptor";
import { CreateCustomerContract } from "../contracts/Customer/create-customer.contracts";
import { CreateCustomerDto } from "../DTOs/create-customer.dto";
import { AccountService } from "../services/account.services";
import { User } from "../models/user.model";
import { CustomerService } from "../services/customer.service";
import { Adress } from "../models/adress.model";
import { CreateAddressContract } from "../contracts/Customer/create-address.contract";
import { CreatePetsContract } from "../contracts/Customer/create-pet.contract";
import { Pet } from "../models/pet.model";

@Controller('v1/customers')
export class CustomerController {
    constructor(    
        private readonly accountService: AccountService,
        private readonly customerService: CustomerService
    ) {  }

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
    async post(@Body() model: CreateCustomerDto) {
        try {
        
            const user = await this.accountService.create(new User(model.document, model.password, true))
        
            const customer = new Customer(model.name,model.document,model.email,null,null,null,null,user);
            const result = await this.customerService.create(customer)
            
            return new Result('Cliente criado com exito', true, result, null);
        
        } catch (error) {
            throw new HttpException(new Result('Não foi possivel realizar seu cadastro', false, null, error), HttpStatus.BAD_REQUEST)
        }
        

    }

    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    @Post(':document/addresses/billing')
    async  addBillingAddress(@Param('document') document , @Body() model: Adress){
        try {
            await this.customerService.addBillingAddress(document, model);
            return model;
        } catch (error) {
            throw new HttpException(new Result("Não foi possivel adicionar o seu endereço", false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    @Post(':document/addresses/shipping')
    async  addShippingAddress(@Param('document') document , @Body() model: Adress){
        try {
            await this.customerService.addShippingAddress(document, model);
            return model;
        } catch (error) {
            throw new HttpException(new Result("Não foi possivel adicionar o seu endereço de entrega", false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @UseInterceptors(new ValidatorInterceptor(new CreatePetsContract()))
    @Post(':document/pets')
    async createPet(@Param('document') document, @Body() model: Pet) {
        try {

            const result = await this.customerService.createPet(document, model);
            return new Result("Pet adicionado com sucesso", true, result, null)
        
        } catch (error) {
            throw new HttpException(new Result("Não foi possivel criar seu pet",false, null, error), HttpStatus.BAD_REQUEST);
        }
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
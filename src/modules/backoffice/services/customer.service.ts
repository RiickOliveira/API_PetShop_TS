import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Customer } from "../models/customer.model";
import { Model } from 'mongoose'
import { QueryDto } from "../DTOs/query.dto";
import { UpdateCustomerDto } from "../DTOs/customer/update-customer.dto";
import { CreditCard } from "../models/creditCard.model";

@Injectable()
export class CustomerService {
    constructor(@InjectModel('Customer') private readonly model: Model<Customer>) { }

    async findAll() :Promise<Customer[]> {
        return await this.model
            .find({}, 'name email document')// apenas o {} vai trazer todos os dados relacionados com o usuario
            .sort('name')//ordenacao crescente, para decrescente acrescentar um -
            .exec();//se quiser exibir tudo exceto um campo, acrescentar um -
    }

    async find(document): Promise<Customer> {
        return await this.model
            .find({ document })
            .populate('user', 'username')//nao utilizando o populate retorna apenas o id do user// similar ao Include do Entity c#
            .exec();
    }

    async query(model: QueryDto) : Promise<Customer[]>{
        return await this.model
            .find(
                model.query,
                model.fields,
                {
                    skip : model.skip,
                    limit : model.take
                })
            .sort(model.sort)
            .exec();
    }

    async create(data: Customer): Promise<Customer> {
        const customer = new this.model(data)
        return await customer.save();
    }  

    async update (document: string, data: UpdateCustomerDto): Promise<Customer>{
        return await this.model.findOneAndUpdate({document}, data);
    }

    async saveOrUpdateCreditcard(document: string, data: CreditCard): Promise<CreditCard>{
        const options = { upsert: true };
        return this.model.findOneAndUpdate({document},{
            $set : {
                card : data
            }
        }, options);
    }

    
}

/**
 * JSON MODELO PARA A QUERY 
 * {
 *      query : {
 *          document: "13549879"    
 *      }
 *      fields : "name email password"
 *      sort: "name"
 *      skip: 0
 *      take: 15
 * }
 */
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Customer } from "../models/customer.model";
import { Model } from 'mongoose'
import { Adress } from "../models/adress.model";
import { Pet } from "../models/pet.model";

@Injectable()
export class CustomerService {
    constructor(@InjectModel('Customer') private readonly model: Model<Customer>) { }

    async create(data: Customer): Promise<Customer> {
        const customer = new this.model(data)
        return await customer.save();
    }

    async addBillingAddress (document: string, data: Adress) :Promise<Customer> {
        const options = { upsert : true }
        return await this.model.findOneAndUpdate({ document }, {
            $set : {
                billingAddress : data
            }
        }, options)
    }

    async addShippingAddress (document: string, data: Adress) :Promise<Customer> {
        const options = { upsert : true }
        return await this.model.findOneAndUpdate({ document }, {
            $set : {
                shippingAddress : data
            }
        }, options)
    }

    async createPet(document: string, data: Pet): Promise<Customer> {
        const options = { new: true }
        return await this.model.findOneAndUpdate({ document },{
            $push : {
                pets : data
            }
        }, options) 
    }
}
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Customer } from "../models/customer.model";
import { Model } from 'mongoose'
import { Adress } from "../models/adress.model";
import { AddresType } from "../enums/address-type.enum";

@Injectable()
export class AddressService {
    constructor(@InjectModel('Customer') private readonly model: Model<Customer>) { }

    async create (document: string, data: Adress, type: AddresType) :Promise<Customer> {
        const options = { upsert : true }
        if (type == AddresType.Billing){
            return await this.model.findOneAndUpdate({ document }, {
                $set : {
                    billingAddress : data
                }
            }, options)
        } else {
            return await this.model.findOneAndUpdate({ document }, {
                $set : {
                    shippingAddress : data
                }
            }, options)
        }
        
    }
    
}

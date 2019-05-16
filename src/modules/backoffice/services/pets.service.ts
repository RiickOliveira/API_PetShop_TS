import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Customer } from "../models/customer.model";
import { Model } from 'mongoose'
import { Pet } from "../models/pet.model";

@Injectable()
export class PetsService {
    constructor(@InjectModel('Customer') private readonly model: Model<Customer>) { }   

    async create(document: string, data: Pet): Promise<Customer> {
        const options = { new: true }
        return await this.model.findOneAndUpdate({ document },{
            $push : {
                pets : data
            }
        }, options) 
    }

    async update(document: string, id: string, data: Pet) : Promise<Pet> {
        return await this.model.findOneAndUpdate({ document, 'pets._id': id }, {
            $set : {
                'pets.$' : data
            }
        })
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
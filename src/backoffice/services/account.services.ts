import { Injectable } from "@nestjs/common";
import { User } from "../models/user.model";
import { InjectModel } from "@nestjs/mongoose";
import {Model} from 'mongoose'

@Injectable()
export class AccountService {
    
    constructor(@InjectModel('User') private readonly model: Model<User>) {
     
    }
    async create (data: User): Promise<User> {
        const user = new this.model(data)
        return await user.save();
    }   
}
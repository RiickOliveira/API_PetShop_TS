import { Injectable, HttpService } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Customer } from "../models/customer.model";
import { Model } from 'mongoose'
import { Adress } from "../models/adress.model";
import { AddresType } from "../enums/address-type.enum";

@Injectable()
export class AddressService {
    constructor(@InjectModel('Customer') private readonly model: Model<Customer>,
            private readonly httpService: HttpService
    ) { }

    async create(document: string, data: Adress, type: AddresType): Promise<Customer> {
        const options = { upsert: true }
        if (type == AddresType.Billing) {
            return await this.model.findOneAndUpdate({ document }, {
                $set: {
                    billingAddress: data
                }
            }, options)
        } else {
            return await this.model.findOneAndUpdate({ document }, {
                $set: {
                    shippingAddress: data
                }
            }, options)
        }

    }

    getAdressByZipCode(zipCode: string) {
        const url = `http://apps.widenet.com.br/busca-cep/api/cep/${zipCode}.json`
        return this.httpService.get(url);
    }

}

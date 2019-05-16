import { Module } from '@nestjs/common';
import { CustomerController } from './controllers/customer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema } from './schemas/customer.schema';
import { UserSchema } from './schemas/user.schema';
import { AccountService } from './services/account.services';
import { CustomerService } from './services/customer.service';
import { AddressService } from './services/adress.service';
import { PetsService } from './services/pets.service';
import { AddressController } from './controllers/address.controller';
import { PetsController } from './controllers/pets.controller';

@Module({
    imports : [MongooseModule.forFeature([
        {
            name: 'Customer',
            schema: CustomerSchema
        },
        {
            name: 'User',
            schema: UserSchema
        }
    ])],
    providers: [
        AccountService,
        AddressService,
        PetsService,
        CustomerService
    ],
    controllers : [
        AddressController,
        PetsController,
        CustomerController,

    ]
})
export class BackofficeModule {}

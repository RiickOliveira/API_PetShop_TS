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
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/shared/services/auth.service';
import { JwtStrategy } from 'src/shared/strategies/jwt.strategy';
import { AccountController } from './controllers/account.controller';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secretOrPrivateKey: 'khf98h2jksf9',
            signOptions: {
                expiresIn: 3600
            }
        }),
        MongooseModule.forFeature(
            [
                {
                    name: 'Customer',
                    schema: CustomerSchema
                },
                {
                    name: 'User',
                    schema: UserSchema
                }
            ]
        )
    ],
    providers: [
        AccountService,
        AddressService,
        PetsService,
        CustomerService,
        AuthService,
        JwtStrategy
    ],
    controllers: [
        AccountController,
        AddressController,
        PetsController,
        CustomerController,

    ]
})
export class BackofficeModule { }

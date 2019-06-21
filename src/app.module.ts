import { Module } from '@nestjs/common';
import { BackofficeModule } from 'src/modules/backoffice/backoffice.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreModule } from 'src/modules/store/store.module';
import { AgendaModule } from './modules/agenda/agenda.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.CONNECTION_STRING),  
    BackofficeModule,
    StoreModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username:'root',
      password: '123456789',
      database: 'PetShop',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AgendaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { BackofficeModule } from 'src/modules/backoffice/backoffice.module';
import { MongooseModule } from '@nestjs/mongoose'
import { StoreModule } from './modules/store/store.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://rick:rick7180@ds064748.mlab.com:64748/7180'),  
    BackofficeModule, StoreModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

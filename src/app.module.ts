import { Module } from '@nestjs/common';
import { BackofficeModule } from './backoffice/backoffice.module';
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://rick:rick7180@ds064748.mlab.com:64748/7180'),  
    BackofficeModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

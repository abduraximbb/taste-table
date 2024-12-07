import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Clients, ClientsSchema } from './schemas/client.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name:Clients.name,
      schema:ClientsSchema
    }
  ]),
  JwtModule.register({})
  ],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}

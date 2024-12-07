import { Module } from '@nestjs/common';
import { ManagersService } from './managers.service';
import { ManagersController } from './managers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Managers, ManagersSchema } from './schemas/manager.schema';
import {
  Restaurant,
  RestaurantSchema,
} from '../restaurant/schemas/restaurant.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Managers.name,
        schema: ManagersSchema,
      },
      {
        name: Restaurant.name,
        schema: RestaurantSchema,
      },
    ]),
    JwtModule.register({}),
  ],
  controllers: [ManagersController],
  providers: [ManagersService],
})
export class ManagersModule {}

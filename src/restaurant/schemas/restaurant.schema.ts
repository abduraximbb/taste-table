import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Table } from '../../table/schemas/table.schema';
import { Managers } from '../../managers/schemas/manager.schema';

export type RestaurantDocument = HydratedDocument<Restaurant>;

@Schema({ versionKey: false })
export class Restaurant {
  @Prop()
  name: string;

  @Prop()
  phone_number: string;

  @Prop()
  description: string;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Table',
      },
    ],
  })
  tables: Table[];

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Managers',
      },
    ],
  })
  managers: Managers[];
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);

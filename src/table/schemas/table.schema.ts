import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Restaurant } from '../../restaurant/schemas/restaurant.schema';

export type TableDocument = HydratedDocument<Table>;

@Schema({ versionKey: false })
export class Table {
  @Prop()
  number: string;

  @Prop()
  amount: number;

  @Prop()
  qr_code: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
  })
  restaurant_id: Restaurant;
}

export const TableSchema = SchemaFactory.createForClass(Table);

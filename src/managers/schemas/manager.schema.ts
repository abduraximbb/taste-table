import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Food_categories } from '../../food_categories/schemas/food_category.schema';
import { Restaurant } from '../../restaurant/schemas/restaurant.schema';

export type ManagersDocument = HydratedDocument<Managers>;

@Schema({ versionKey: false })
export class Managers {
  @Prop()
  name: string;

  @Prop({unique:true})
  email: string;

  @Prop()
  hashed_password: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
  })
  restaurant_id: Restaurant;

  @Prop({ default: true })
  is_active: boolean;

  @Prop()
  tg_link: string;

  @Prop()
  hashed_refresh_token:string
}

export const ManagersSchema = SchemaFactory.createForClass(Managers);

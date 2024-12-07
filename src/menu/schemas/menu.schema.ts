import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Food_categories } from '../../food_categories/schemas/food_category.schema';
import { Restaurant } from '../../restaurant/schemas/restaurant.schema';

export type MenuDocument = HydratedDocument<Menu>;

@Schema({ versionKey: false })
export class Menu {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food_categories',
  })
  food_categories_id: Food_categories;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
  })
  restaurant_id: Restaurant;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  image_url: number;

  @Prop()
  status: boolean;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);

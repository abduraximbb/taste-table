import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type Food_categoriesDocument = HydratedDocument<Food_categories>;

@Schema({ versionKey: false })
export class Food_categories {
  @Prop()
  name: string;

  @Prop()
  description: string;
}

export const Food_categoriesSchema =
  SchemaFactory.createForClass(Food_categories);

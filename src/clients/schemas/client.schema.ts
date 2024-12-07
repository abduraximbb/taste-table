import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ClientsDocument = HydratedDocument<Clients>;

@Schema({ versionKey: false })
export class Clients {
  @Prop()
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  hashed_password: string;

  @Prop()
  tg_link: string;

  @Prop()
  phone: string;

  @Prop()
  hashed_refresh_token: string;
}

export const ClientsSchema = SchemaFactory.createForClass(Clients);

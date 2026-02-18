import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Location extends Document {
  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop()
  country: string;

  @Prop()
  pincode: string;

  @Prop()
  latitude: number;

  @Prop()
  longitude: number;

  @Prop({ default: 0 })
  listingCount: number;

  @Prop({ default: true })
  active: boolean;
}

export const LocationSchema = SchemaFactory.createForClass(Location);

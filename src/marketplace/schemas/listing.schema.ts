import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: "listings", timestamps: true })
export class Listing extends Document {
  @Prop({ required: true })
  listingId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  location: string;

  @Prop({ default: false })
  delivery: boolean;

  @Prop({ default: false })
  pickup: boolean;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  username: string;

  @Prop({ default: false })
  featured: boolean;

  @Prop({ default: 0 })
  views: number;

  @Prop({ type: [String], default: [] })
  favoritedBy: string[];

  @Prop({ default: true })
  active: boolean;
}

export const ListingSchema = SchemaFactory.createForClass(Listing);

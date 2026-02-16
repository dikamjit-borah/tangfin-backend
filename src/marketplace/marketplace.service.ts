import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Listing } from './schemas/listing.schema';

@Injectable()
export class MarketplaceService {
  constructor(
    @InjectModel(Listing.name) private listingModel: Model<Listing>,
  ) {}

  async getListings(query: any) {
    const { category, location, page = 1, limit = 20, sort = 'createdAt' } = query;
    const skip = (Number(page) - 1) * Number(limit);

    const filter: any = { active: true };
    if (category) filter.category = category;
    if (location) filter.location = location;

    const sortOrder = sort.startsWith('-') ? -1 : 1;
    const sortField = sort.replace('-', '');

    const [listings, total] = await Promise.all([
      this.listingModel
        .find(filter)
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(Number(limit))
        .exec(),
      this.listingModel.countDocuments(filter).exec(),
    ]);

    return {
      listings,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
      total,
    };
  }

  async getFeaturedListings(limit: number = 6) {
    const listings = await this.listingModel
      .find({ featured: true, active: true })
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec();

    return { listings };
  }

  async getListing(id: string) {
    const listing = await this.listingModel.findById(id).exec();
    if (!listing) {
      throw new NotFoundException('Listing not found');
    }
    return { listing };
  }

  async createListing(data: any) {
    const listing = new this.listingModel({
      ...data,
      userId: data.userId || 'user123', // Should come from auth
      views: 0,
      favoritedBy: [],
      active: true,
    });
    await listing.save();
    return { listing };
  }

  async updateListing(id: string, data: any) {
    const listing = await this.listingModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    
    if (!listing) {
      throw new NotFoundException('Listing not found');
    }
    return { listing };
  }

  async deleteListing(id: string) {
    const result = await this.listingModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Listing not found');
    }
    return { success: true };
  }

  async getUserListings(userId: string, query: any) {
    const { page = 1, limit = 20 } = query;
    const skip = (Number(page) - 1) * Number(limit);

    const [listings, total] = await Promise.all([
      this.listingModel
        .find({ userId })
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 })
        .exec(),
      this.listingModel.countDocuments({ userId }).exec(),
    ]);

    return {
      listings,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    };
  }

  async incrementViews(id: string) {
    const listing = await this.listingModel
      .findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true })
      .exec();
    
    if (!listing) {
      throw new NotFoundException('Listing not found');
    }
    return { views: listing.views };
  }

  async addToFavorites(id: string, userId: string) {
    const listing = await this.listingModel
      .findByIdAndUpdate(
        id,
        { $addToSet: { favoritedBy: userId } },
        { new: true },
      )
      .exec();
    
    if (!listing) {
      throw new NotFoundException('Listing not found');
    }
    return { success: true };
  }

  async removeFromFavorites(id: string, userId: string) {
    const listing = await this.listingModel
      .findByIdAndUpdate(
        id,
        { $pull: { favoritedBy: userId } },
        { new: true },
      )
      .exec();
    
    if (!listing) {
      throw new NotFoundException('Listing not found');
    }
    return { success: true };
  }

  async getFavorites(userId: string, query: any) {
    const { page = 1, limit = 20 } = query;
    const skip = (Number(page) - 1) * Number(limit);

    const [listings, total] = await Promise.all([
      this.listingModel
        .find({ favoritedBy: userId, active: true })
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 })
        .exec(),
      this.listingModel.countDocuments({ favoritedBy: userId, active: true }).exec(),
    ]);

    return {
      listings,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    };
  }
}

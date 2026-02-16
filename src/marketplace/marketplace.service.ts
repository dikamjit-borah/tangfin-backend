import { Injectable } from '@nestjs/common';

@Injectable()
export class MarketplaceService {
  getListings(query: any) {
    const { category, location, page = 1, limit = 20, sort = 'createdAt' } = query;
    const listings = [
      { id: '1', title: 'Fresh Salmon', price: 500, category: 'fish', location: 'Mumbai', featured: true, views: 120 },
      { id: '2', title: 'Tuna Fish', price: 800, category: 'fish', location: 'Mumbai', featured: false, views: 85 },
    ];
    return {
      listings,
      pagination: { page: Number(page), limit: Number(limit), totalPages: 1 },
      total: listings.length,
    };
  }

  getFeaturedListings(limit: number = 6) {
    const listings = [
      { id: '1', title: 'Fresh Salmon', price: 500, category: 'fish', location: 'Mumbai', featured: true },
      { id: '3', title: 'Premium Prawns', price: 1200, category: 'fish', location: 'Delhi', featured: true },
    ];
    return { listings: listings.slice(0, limit) };
  }

  getListing(id: string) {
    return {
      listing: {
        id,
        title: 'Fresh Salmon',
        description: 'High quality fresh salmon',
        price: 500,
        category: 'fish',
        location: 'Mumbai',
        delivery: true,
        pickup: true,
        images: ['image1.jpg', 'image2.jpg'],
        views: 120,
        createdAt: new Date(),
      },
    };
  }

  createListing(data: any) {
    return {
      listing: {
        id: '123',
        ...data,
        createdAt: new Date(),
        views: 0,
      },
    };
  }

  updateListing(id: string, data: any) {
    return {
      listing: {
        id,
        ...data,
        updatedAt: new Date(),
      },
    };
  }

  deleteListing(id: string) {
    return { success: true };
  }

  getUserListings(userId: string, query: any) {
    const { page = 1, limit = 20 } = query;
    const listings = [
      { id: '1', title: 'User Listing 1', userId, price: 300 },
      { id: '2', title: 'User Listing 2', userId, price: 450 },
    ];
    return {
      listings,
      pagination: { page: Number(page), limit: Number(limit), totalPages: 1 },
    };
  }

  incrementViews(id: string) {
    return { views: 121 };
  }

  addToFavorites(id: string, userId: string) {
    return { success: true };
  }

  removeFromFavorites(id: string, userId: string) {
    return { success: true };
  }

  getFavorites(userId: string, query: any) {
    const { page = 1, limit = 20 } = query;
    const listings = [
      { id: '5', title: 'Favorite Listing 1', price: 600 },
      { id: '8', title: 'Favorite Listing 2', price: 900 },
    ];
    return {
      listings,
      pagination: { page: Number(page), limit: Number(limit), totalPages: 1 },
    };
  }
}

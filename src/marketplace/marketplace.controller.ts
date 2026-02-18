import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  Headers,
} from '@nestjs/common';
import { MarketplaceService } from './marketplace.service';

@Controller('marketplace')
export class MarketplaceController {
  constructor(private readonly marketplaceService: MarketplaceService) {}

  @Get('listings')
  getListings(@Query() query: any) {
    return this.marketplaceService.getListings(query);
  }

  @Get('featured')
  getFeaturedListings(@Query('limit') limit?: number) {
    return this.marketplaceService.getFeaturedListings(limit);
  }

  @Get('favorites')
  getFavorites(@Query() query: any, @Headers('authorization') auth?: string) {
    const userId = 'user123'; // Extract from auth token
    return this.marketplaceService.getFavorites(userId, query);
  }

  @Get('user/:userId')
  getUserListings(@Param('userId') userId: string, @Query() query: any) {
    return this.marketplaceService.getUserListings(userId, query);
  }

  @Get('listings/:listingId')
  getListing(@Param('listingId') listingId: string) {
    return this.marketplaceService.getListing(listingId);
  }

  @Post()
  createListing(@Body() data: any) {
    return this.marketplaceService.createListing(data);
  }

  @Put(':id')
  updateListing(@Param('id') id: string, @Body() data: any) {
    return this.marketplaceService.updateListing(id, data);
  }

  @Delete(':id')
  deleteListing(@Param('id') id: string) {
    return this.marketplaceService.deleteListing(id);
  }

  @Post(':id/views')
  incrementViews(@Param('id') id: string) {
    return this.marketplaceService.incrementViews(id);
  }

  @Post(':id/favorite')
  addToFavorites(
    @Param('id') id: string,
    @Headers('authorization') auth?: string,
  ) {
    const userId = 'user123'; // Extract from auth token
    return this.marketplaceService.addToFavorites(id, userId);
  }

  @Delete(':id/favorite')
  removeFromFavorites(
    @Param('id') id: string,
    @Headers('authorization') auth?: string,
  ) {
    const userId = 'user123'; // Extract from auth token
    return this.marketplaceService.removeFromFavorites(id, userId);
  }

  @Get('categories')
  getCategories() {
    return this.marketplaceService.getCategories();
  }

  @Get('locations')
  getLocations() {
    return this.marketplaceService.getLocations();
  }

  @Get('locations/search')
  searchLocations(@Query('q') query: string) {
    return this.marketplaceService.searchLocations(query);
  }
}

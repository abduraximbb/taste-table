import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Menu } from './schemas/menu.schema';
import { Model } from 'mongoose';
import { Food_categories } from '../food_categories/schemas/food_category.schema';
import { Restaurant } from '../restaurant/schemas/restaurant.schema';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(Menu.name) private menuModel: Model<Menu>,
    @InjectModel(Food_categories.name) private food_categoriesModel: Model<Food_categories>,
    @InjectModel(Restaurant.name) private restaurantModel: Model<Restaurant>
  ) {}

  create(createMenuDto: CreateMenuDto) {
    const { food_categories_id, restaurant_id } = createMenuDto;
    const food_categories = this.food_categoriesModel.findById(food_categories_id)
    const restaurant = this.restaurantModel.findById(restaurant_id)
    if(!food_categories){
      throw new BadRequestException("This food_categories not found")
    }
    if (!restaurant) {
      throw new BadRequestException('This restaurant not found');
    }
    return this.menuModel.create(createMenuDto);
  }

  findAll() {
    return this.menuModel
      .find()
      .populate(['food_categories_id', 'restaurant_id']);
  }

  findOne(id: string) {
    return this.menuModel
      .findById(id)
      .populate(['food_categories_id', 'restaurant_id']);
  }

  update(id: string, updateMenuDto: UpdateMenuDto) {
    return this.menuModel.findByIdAndUpdate(id, updateMenuDto);
  }

  remove(id: string) {
    return this.menuModel.findByIdAndDelete(id);
  }
}

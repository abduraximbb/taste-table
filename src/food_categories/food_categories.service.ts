import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFoodCategoryDto } from './dto/create-food_category.dto';
import { UpdateFoodCategoryDto } from './dto/update-food_category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Food_categories } from './schemas/food_category.schema';
import { Model } from 'mongoose';
import { Language } from '../language/schemas/language.schema';

@Injectable()
export class FoodCategoriesService {
  constructor(
    @InjectModel(Food_categories.name)
    private food_categoriesModel: Model<Food_categories>,
    @InjectModel(Language.name) private languageModel: Model<Language>,
  ) {}

  create(createFoodCategoryDto: CreateFoodCategoryDto) {
    const { language_id } = createFoodCategoryDto;
    const language = this.languageModel.findById(language_id);
    if (!language) {
      throw new BadRequestException('This is language not found');
    }

    return 'This action adds a new foodCategory';
  }

  findAll() {
    return this.food_categoriesModel.find();
  }

  findOne(id: string) {
    return this.food_categoriesModel.findById(id);
  }

  async updateByLangId(id:string, updateFoodCategoryDto:UpdateFoodCategoryDto){
    const language = await this.languageModel.findById(updateFoodCategoryDto.language_id)

    return this.food_categoriesModel.findByIdAndUpdate(id,
      {['name_'+language.code]:updateFoodCategoryDto.name},
      {new:true, strict:false}
    )
  }

  

  // update(id: string, updateFoodCategoryDto: UpdateFoodCategoryDto) {
  //   return this.food_categoriesModel.findByIdAndUpdate(id, updateFoodCategoryDto);
  // }

  remove(id: string) {
    return this.food_categoriesModel.findByIdAndDelete(id);
  }
}

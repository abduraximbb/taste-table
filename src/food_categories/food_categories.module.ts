import { Module } from '@nestjs/common';
import { FoodCategoriesService } from './food_categories.service';
import { FoodCategoriesController } from './food_categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Food_categories,
  Food_categoriesSchema,
} from './schemas/food_category.schema';
import { Language, LanguageSchema } from '../language/schemas/language.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Food_categories.name,
        schema: Food_categoriesSchema,
      },
      {
        name:Language.name,
        schema:LanguageSchema
      }
    ]),
  ],
  controllers: [FoodCategoriesController],
  providers: [FoodCategoriesService],
})
export class FoodCategoriesModule {}

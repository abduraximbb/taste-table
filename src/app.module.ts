import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { TableModule } from './table/table.module';
import { MenuModule } from './menu/menu.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LanguageModule } from './language/language.module';
import { FoodCategoriesModule } from './food_categories/food_categories.module';
import { ManagersModule } from './managers/managers.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AdminModule,
    RestaurantModule,
    TableModule,
    MenuModule,
    LanguageModule,
    FoodCategoriesModule,
    ManagersModule,
    ClientsModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}

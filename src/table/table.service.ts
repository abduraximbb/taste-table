import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from '../restaurant/schemas/restaurant.schema';
import { Model } from 'mongoose';
import { Table } from './schemas/table.schema';
import * as QRCode from 'qrcode';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TableService {
  constructor(
    @InjectModel(Restaurant.name) private restaurantModel: Model<Restaurant>,
    @InjectModel(Table.name) private tableModel: Model<Table>,
  ) {}

  async generateQRCodeFile(text: string, fileName: string): Promise<string> {
    try {
      const qrCodeBuffer = await QRCode.toBuffer(text);
      const filePath = path.join(
        __dirname,
        '../public/qr-codes',
        `${fileName}.png`,
      );
      fs.mkdirSync(path.dirname(filePath), { recursive: true });

      fs.writeFileSync(filePath, qrCodeBuffer);

      return filePath;
    } catch (error) {
      throw new Error('Failed to generate or save QR code');
    }
  }

  async create(createTableDto: CreateTableDto) {
    const { restaurant_id } = createTableDto;
    const restaurant = await this.restaurantModel.findById(restaurant_id);
    if (!restaurant) {
      throw new BadRequestException('This restaurant not found');
    }
    const newTable = await this.tableModel.create(createTableDto);

    const baseUrl = `${process.env.API_URL}:${process.env.PORT}/api/menu`;
    const link = `${baseUrl}/${restaurant_id}/${newTable._id}`
    await this.generateQRCodeFile(link, String(newTable._id))
    newTable.qr_code = link
    await newTable.save()

    restaurant.tables.push(newTable);
    await restaurant.save();

    return newTable;
  }

  findAll() {
    return this.tableModel.find().populate('restaurant_id');
  }

  findOne(id: string) {
    return this.tableModel.findById(id).populate('restaurant_id');
  }

  update(id: string, updateTableDto: UpdateTableDto) {
    return this.tableModel.findByIdAndUpdate(id, updateTableDto, { new: true });
  }

  remove(id: string) {
    return this.tableModel.findOneAndDelete({ _id: id });
  }
}

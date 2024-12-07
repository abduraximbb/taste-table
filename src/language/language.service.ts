import { Injectable } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Language } from './schemas/language.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class LanguageService {
  constructor(
    @InjectModel(Language.name) private languageModel: Model<Language>,
  ) {}

  create(createLanguageDto: CreateLanguageDto) {
    return this.languageModel.create(createLanguageDto);
  }

  findAll() {
    return this.languageModel.find();
  }

  findOne(id: string) {
    return this.languageModel.findById(id);
  }

  update(id: string, updateLanguageDto: UpdateLanguageDto) {
    return this.languageModel.findByIdAndUpdate(id, updateLanguageDto);
  }

  remove(id: string) {
    return this.languageModel.findByIdAndDelete(id);
  }
}

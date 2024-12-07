import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';

import * as uuid from 'uuid';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Managers, ManagersDocument } from './schemas/manager.schema';
import { Model } from 'mongoose';
import { Response } from 'express';
import {
  Restaurant,
  RestaurantDocument,
} from '../restaurant/schemas/restaurant.schema';
import { SignInDto } from './schemas/signIn.dto';

@Injectable()
export class ManagersService {
  constructor(
    @InjectModel(Managers.name) private managerModel: Model<ManagersDocument>,
    @InjectModel(Restaurant.name)
    private resraurantModel: Model<RestaurantDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async generateTokens(manager: ManagersDocument) {
    const payload = {
      id: manager._id,
      name: manager.name,
      is_active: manager.is_active,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }

  async create(createManagerDto: CreateManagerDto, res: Response) {
    const { password, confirm_password, restaurant_id } = createManagerDto;
    console.log(createManagerDto.email);

    // const exists_email = this.managerModel.findOne({ email: createManagerDto.email });
    // if (exists_email) {
    //   throw new BadRequestException('This email already exists');
    // }

    const restaurant = await this.resraurantModel.findById(restaurant_id);
    if (!restaurant) {
      throw new BadRequestException('This restaurant not found');
    }
    if (password !== confirm_password) {
      throw new BadRequestException('Passwords do not match');
    }
    const hashed_password = await bcrypt.hash(password, 7);
    const newManager = await this.managerModel.create({
      ...createManagerDto,
      hashed_password,
    });
    const tokens = await this.generateTokens(newManager);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    newManager.hashed_refresh_token = hashed_refresh_token;
    await newManager.save();
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.REFRESH_TIME_MS,
    });

    restaurant.managers.push(newManager);
    await restaurant.save();

    return {
      message: 'Manager addedd success',
      id: newManager._id,
      accessToken: tokens.access_token,
    };
  }

  async signIn(signInDto: SignInDto, res: Response) {
    const manager = await this.managerModel.findOne({
      email: signInDto.email,
    });
    if (!manager) {
      throw new UnauthorizedException('Manager not found');
    }
    const validPassword = await bcrypt.compare(
      signInDto.password,
      manager.hashed_password,
    );
    if (!validPassword) {
      throw new UnauthorizedException('Manager not found');
    }

    const tokens = await this.generateTokens(manager);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedManager = await this.managerModel.findByIdAndUpdate(
      manager._id,
      { hashed_refresh_token, is_active: true },
      { new: true },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.REFRESH_TIME_MS,
    });

    return {
      message: 'Manager signed in success',
      id: manager._id,
      accessToken: tokens.access_token,
    };
  }

  async signOut(refreshToken: string, res: Response) {
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    const manager = await this.managerModel.findOne({ _id: payload.id });
    if (!manager) {
      throw new BadRequestException('Manager topilmadi');
    }

    await this.managerModel.findByIdAndUpdate(manager._id, {
      hashed_refresh_token: null,
      is_active:false
    });

    res.clearCookie('refresh_token');

    return {
      message: 'Manager success logouted',
    };
  }

  async refreshToken(refreshToken: string, res: Response) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      const manager = await this.managerModel.findById(payload.id);
      if (!manager) {
        throw new UnauthorizedException('Manager topilmadi');
      }

      const valid_refresh_token = await bcrypt.compare(
        refreshToken,
        manager.hashed_refresh_token,
      );
      if (!valid_refresh_token) {
        throw new UnauthorizedException("So'rovda xatolik");
      }

      const tokens = await this.generateTokens(manager);
      const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

      await this.managerModel.findByIdAndUpdate(
        manager._id,
        { hashed_refresh_token },
        { new: true },
      );

      res.cookie('refresh_token', tokens.refresh_token, {
        httpOnly: true,
        maxAge: +process.env.REFRESH_TIME_MS,
      });

      return {
        access_token: tokens.access_token,
      };
    } catch (error) {
      throw new BadRequestException('Expired token');
    }
  }

  findAll() {
    return this.managerModel.find().populate('restaurant_id');
  }

  findOne(id: string) {
    return this.managerModel.findById(id).populate('restaurant_id');
  }

  async update(id: string, updateManagerDto: UpdateManagerDto) {
    const manager = await this.managerModel.findById(id);
    const exists_email = this.managerModel.findOne({
      email: updateManagerDto.email,
    });
    // console.log(exists_email);

    // if (exists_email && manager.email !== updateManagerDto.email) {
    //   throw new BadRequestException('This email already exists');
    // }

    return this.managerModel.findByIdAndUpdate(id, updateManagerDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.managerModel.findByIdAndDelete(id);
  }
}

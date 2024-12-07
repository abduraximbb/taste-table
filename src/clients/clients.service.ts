import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Clients, ClientsDocument } from './schemas/client.schema';
import { Model } from 'mongoose';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Response } from 'express';

import * as bcrypt from 'bcrypt';
import { SignInDto } from '../managers/schemas/signIn.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Clients.name) private clientModel: Model<ClientsDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async generateTokens(client: ClientsDocument) {
    const payload = {
      id: client._id,
      name: client.name,
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

  async create(createClientDto: CreateClientDto, res: Response) {
    const { password, confirm_password } = createClientDto;

    const exists_email = this.clientModel.findOne({
      email: createClientDto.email,
    });
    // if (exists_email) {
    //   throw new BadRequestException('This email already exists');
    // }

    if (password !== confirm_password) {
      throw new BadRequestException('Passwords do not match');
    }
    const hashed_password = await bcrypt.hash(password, 7);
    const newClient = await this.clientModel.create({
      ...createClientDto,
      hashed_password,
    });
    const tokens = await this.generateTokens(newClient);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    newClient.hashed_refresh_token = hashed_refresh_token;
    await newClient.save();
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.REFRESH_TIME_MS,
    });

    return {
      message: 'Client addedd success',
      id: newClient._id,
      accessToken: tokens.access_token,
    };
  }

  async signIn(signInDto: SignInDto, res: Response) {
    const client = await this.clientModel.findOne({
      email: signInDto.email,
    });
    if (!client) {
      throw new UnauthorizedException('Client not found');
    }
    const validPassword = await bcrypt.compare(
      signInDto.password,
      client.hashed_password,
    );
    if (!validPassword) {
      throw new UnauthorizedException('Client not found');
    }

    const tokens = await this.generateTokens(client);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedClient = await this.clientModel.findByIdAndUpdate(
      client._id,
      { hashed_refresh_token },
      { new: true },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.REFRESH_TIME_MS,
    });

    return {
      message: 'Client signed in success',
      id: client._id,
      accessToken: tokens.access_token,
    };
  }

  async signOut(refreshToken: string, res: Response) {
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    const client = await this.clientModel.findOne({ _id: payload.id });
    if (!client) {
      throw new BadRequestException('Client topilmadi');
    }

    await this.clientModel.findByIdAndUpdate(client._id, {
      hashed_refresh_token: null,
    });

    res.clearCookie('refresh_token');

    return {
      message: 'Client success logouted',
    };
  }

  async refreshToken(refreshToken: string, res: Response) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      const manager = await this.clientModel.findById(payload.id);
      if (!manager) {
        throw new UnauthorizedException('Client topilmadi');
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

      await this.clientModel.findByIdAndUpdate(
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
    return this.clientModel.find();
  }

  findOne(id: string) {
    return this.clientModel.findById(id);
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const client = await this.clientModel.findById(id);
    const exists_email = this.clientModel.findOne({
      email: client.email,
    });

    // if (exists_email && client.email !== updateClientDto.email) {
    //   throw new BadRequestException('This email already exists');
    // }

    return this.clientModel.findByIdAndUpdate(id, updateClientDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.clientModel.findByIdAndDelete(id);
  }
}

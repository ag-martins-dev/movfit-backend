import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma/client';
import {
  CreateUserData,
  CreateUserResultData,
  UpdateMetricsData,
  UpdateMetricsResultData,
  UsersRepository,
} from 'src/modules/users/repositories/users-repository';

import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { GetUserMetricsDto } from '../dtos/get-user-metrics.dto';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserData): Promise<CreateUserResultData> {
    return await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        birthDate: data.birthDate,
        passwordHash: data.password,
      },
      omit: {
        passwordHash: true,
        weightInGrams: true,
        goalWeightInGrams: true,
        heightInCentimeters: true,
      },
    });
  }

  async getByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async getById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async updateMetrics(
    userId: string,
    data: UpdateMetricsData,
  ): Promise<UpdateMetricsResultData> {
    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        goal: data.goal,
        biologicalSex: data.biologicalSex,
        heightInCentimeters: data.heightInCentimeters,
        weightInGrams: data.weightInGrams,
        goalWeightInGrams: data.goalWeightInGrams,
      },
      select: {
        goal: true,
        biologicalSex: true,
        heightInCentimeters: true,
        weightInGrams: true,
        goalWeightInGrams: true,
      },
    });
  }

  async getMetrics(userId: string): Promise<GetUserMetricsDto | null> {
    return await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        birthDate: true,
        biologicalSex: true,
        goal: true,
        heightInCentimeters: true,
        weightInGrams: true,
      },
    });
  }
}

import { Body, Controller, Get, HttpStatus, Patch, Req } from '@nestjs/common';

import { GetMeUseCase } from '../use-cases/get-me.use-case';
import { TokenPayloadDto } from 'src/modules/auth/dtos/token-payload.dto';
import type { FastifyRequest } from 'fastify';
import { PAYLOAD_KEY } from 'src/modules/auth/constants/auth.constant';
import { UpdateUserMetricsUseCase } from '../use-cases/update-user-metrics.use-case';
import { UpdateUserMetricsInputDto } from '../dtos/update-user-metrics.dto';
import { ApiResponse } from '@nestjs/swagger';
import { BiologicalSex, UserGoal } from 'generated/prisma/enums';

@Controller({
  path: '/users',
  version: '3',
})
export class UsersController {
  constructor(
    private readonly updateUserMetricsUseCase: UpdateUserMetricsUseCase,
    private readonly getMeUseCase: GetMeUseCase,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'GetMe',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string', format: 'email', uniqueItems: true },
        birthDate: { type: 'string', format: 'date' },
        goal: {
          type: 'string',
          enum: [UserGoal],
        },
        biologicalSex: { type: 'string', enum: [BiologicalSex] },
        weightInGrams: { type: 'number' },
        heightInCentimeters: { type: 'number', maximum: 240 },
        goalWeightInGrams: { type: 'number' },
      },
    },
  })
  @Get('/me')
  getMe(@Req() req: FastifyRequest) {
    const payload: TokenPayloadDto = req[PAYLOAD_KEY];
    return this.getMeUseCase.execute(payload);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'UpdateUserMetrics',
    schema: {
      type: 'object',
      properties: {
        goal: {
          type: 'string',
          enum: [UserGoal],
        },
        biologicalSex: { type: 'string', enum: [BiologicalSex] },
        weightInGrams: { type: 'number' },
        heightInCentimeters: { type: 'number', maximum: 240 },
        goalWeightInGrams: { type: 'number' },
      },
    },
  })
  @Patch('/metrics')
  updateUserMetrics(
    @Req() req: FastifyRequest,
    @Body() dto: UpdateUserMetricsInputDto,
  ) {
    const payload: TokenPayloadDto = req[PAYLOAD_KEY];
    return this.updateUserMetricsUseCase.execute(payload.sub, dto);
  }
}

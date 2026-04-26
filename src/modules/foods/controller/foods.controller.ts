import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UseGuards } from '@nestjs/common'
import { Throttle } from '@nestjs/throttler/dist'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { OnboardingGuard } from 'src/common/guards/onboarding.guard'
import type { AuthUser } from 'src/common/types/auth-user.types'
import { SaveFoodRequestDTO } from '../dtos/save-food.dto'
import { SearchFoodsQueryDTO } from '../dtos/search-foods.dto'
import { SaveFoodUseCase } from '../use-cases/save-food.use-case'
import { SearchFoodsUseCase } from '../use-cases/search-foods.use-case'

@UseGuards(JwtAuthGuard, OnboardingGuard)
@Controller({ path: '/foods', version: '1' })
export class FoodsController {
  constructor(
    private readonly searchFoodsUseCase: SearchFoodsUseCase,
    private readonly saveFoodUseCase: SaveFoodUseCase,
  ) {}

  @Get()
  searchFoods(@CurrentUser() user: AuthUser, @Query() query: SearchFoodsQueryDTO) {
    const { limit = 10, offset = 0 } = query
    return this.searchFoodsUseCase.execute({
      userId: user.id,
      isRecipe: query.isRecipe,
      category: query.category,
      limit,
      offset,
    })
  }

  @Throttle({ heavy: { ttl: 60000, limit: 5 } })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async saveFood(@CurrentUser() user: AuthUser, @Body() body: SaveFoodRequestDTO) {
    return this.saveFoodUseCase.execute({
      userId: user.id,
      ...body,
    })
  }
}

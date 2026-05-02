import { Injectable, NotFoundException } from '@nestjs/common'
import { DietsRepository } from 'src/modules/diets/repositories/diets.repository'
import { DeleteDietInput, DeleteDietOutput } from 'src/modules/diets/types'

@Injectable()
export class DeleteDietUseCase {
  constructor(private readonly dietsRepository: DietsRepository) {}

  async execute(input: DeleteDietInput): Promise<DeleteDietOutput> {
    const diet = await this.dietsRepository.findOne(input.dietId, input.userId)

    if (!diet) throw new NotFoundException('Diet not found.')

    const deletedDiet = await this.dietsRepository.delete(diet.id, input.userId)

    return {
      dietId: deletedDiet.id,
    }
  }
}

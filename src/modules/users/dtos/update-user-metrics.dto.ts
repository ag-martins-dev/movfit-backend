import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { BiologicalSex, UserGoal } from 'generated/prisma/enums';

export class UpdateUserMetricsInputDto {
  @ApiProperty({
    type: 'string',
    enum: [UserGoal],
    required: true,
  })
  @IsEnum(UserGoal, { message: 'Invalid goal selected.' })
  @IsNotEmpty({ message: 'Goal is required.' })
  goal: UserGoal;

  @ApiProperty({
    type: 'string',
    enum: [BiologicalSex],
    required: true,
  })
  @IsEnum(BiologicalSex, { message: 'Invalid biological sex.' })
  @IsNotEmpty({ message: 'Biological sex is required.' })
  biologicalSex: BiologicalSex;

  @ApiProperty({ type: 'number', required: true })
  @IsInt({ message: 'Invalid weight.' })
  @IsNotEmpty({ message: 'Weight is required.' })
  @Min(1, { message: 'Select a valid weight.' })
  @Max(350000, { message: 'Select a valid weight.' })
  weightInGrams: number;

  @ApiProperty({ type: 'number', required: true })
  @IsInt({ message: 'Invalid goal weight.' })
  @IsNotEmpty({ message: 'Goal weight is required.' })
  @Min(1, { message: 'Select a valid goal weight.' })
  @Max(350000, { message: 'Select a valid goal weight.' })
  goalWeightInGrams: number;

  @ApiProperty({ type: 'number', maximum: 240, required: true })
  @IsInt({ message: 'Invalid height selected.' })
  @IsNotEmpty({ message: 'Height is required.' })
  @Min(1, { message: 'Select a valid height.' })
  @Max(210, { message: 'Select a valid height.' })
  heightInCentimeters: number;
}

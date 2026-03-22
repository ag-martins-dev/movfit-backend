import { BiologicalSex, UserGoal } from 'generated/prisma/enums';
import { UserGetPayload } from 'generated/prisma/models';

type GetMetricsPayloadData = UserGetPayload<{
  select: {
    biologicalSex: true;
    birthDate: true;
    heightInCentimeters: true;
    weightInGrams: true;
    goal: true;
  };
}>;

export class GetUserMetricsDto implements GetMetricsPayloadData {
  biologicalSex: BiologicalSex | null;
  birthDate: Date;
  heightInCentimeters: number | null;
  weightInGrams: number | null;
  goal: UserGoal | null;
}

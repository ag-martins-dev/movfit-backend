/*
  Warnings:

  - Changed the type of `goal` on the `diets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DietGoal" AS ENUM ('BULKING', 'CUTTING', 'RECOMPOSITION');

-- AlterTable
ALTER TABLE "diets" DROP COLUMN "goal",
ADD COLUMN     "goal" "DietGoal" NOT NULL;

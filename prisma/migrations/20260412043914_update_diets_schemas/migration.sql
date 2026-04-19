/*
  Warnings:

  - You are about to drop the column `carbs_in_grams` on the `diet_meals` table. All the data in the column will be lost.
  - You are about to drop the column `fats_in_grams` on the `diet_meals` table. All the data in the column will be lost.
  - You are about to drop the column `proteins_in_grams` on the `diet_meals` table. All the data in the column will be lost.
  - You are about to drop the column `total_calories` on the `diet_meals` table. All the data in the column will be lost.
  - You are about to drop the column `calories_in_kcal` on the `diets` table. All the data in the column will be lost.
  - You are about to drop the column `carbs_in_grams` on the `diets` table. All the data in the column will be lost.
  - You are about to drop the column `fats_in_grams` on the `diets` table. All the data in the column will be lost.
  - You are about to drop the column `proteins_in_grams` on the `diets` table. All the data in the column will be lost.
  - You are about to drop the `diet_consumed_foods` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `total_calories_in_kcal` to the `diet_meals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_carbs_in_grams` to the `diet_meals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_fats_in_grams` to the `diet_meals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_proteins_in_grams` to the `diet_meals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_calories_in_kcal` to the `diets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_carbs_in_grams` to the `diets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_fats_in_grams` to the `diets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_proteins_in_grams` to the `diets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "diet_consumed_foods" DROP CONSTRAINT "diet_consumed_foods_diet_meal_id_fkey";

-- AlterTable
ALTER TABLE "diet_meals" DROP COLUMN "carbs_in_grams",
DROP COLUMN "fats_in_grams",
DROP COLUMN "proteins_in_grams",
DROP COLUMN "total_calories",
ADD COLUMN     "total_calories_in_kcal" INTEGER NOT NULL,
ADD COLUMN     "total_carbs_in_grams" INTEGER NOT NULL,
ADD COLUMN     "total_fats_in_grams" INTEGER NOT NULL,
ADD COLUMN     "total_proteins_in_grams" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "diets" DROP COLUMN "calories_in_kcal",
DROP COLUMN "carbs_in_grams",
DROP COLUMN "fats_in_grams",
DROP COLUMN "proteins_in_grams",
ADD COLUMN     "total_calories_in_kcal" INTEGER NOT NULL,
ADD COLUMN     "total_carbs_in_grams" INTEGER NOT NULL,
ADD COLUMN     "total_fats_in_grams" INTEGER NOT NULL,
ADD COLUMN     "total_proteins_in_grams" INTEGER NOT NULL;

-- DropTable
DROP TABLE "diet_consumed_foods";

-- CreateTable
CREATE TABLE "diet_foods" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "calories_in_kcal" INTEGER NOT NULL,
    "proteins_in_grams" INTEGER NOT NULL,
    "carbs_in_grams" INTEGER NOT NULL,
    "fats_in_grams" INTEGER NOT NULL,
    "diet_meal_id" TEXT NOT NULL,
    "food_id" TEXT NOT NULL,

    CONSTRAINT "diet_foods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "foods" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "calories_per_100g_in_kcal" INTEGER NOT NULL,
    "proteins_per_100g_in_grams" INTEGER NOT NULL,
    "carbs_per_100g_in_grams" INTEGER NOT NULL,
    "fats_per_100g_in_grams" INTEGER NOT NULL,

    CONSTRAINT "foods_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "diet_foods" ADD CONSTRAINT "diet_foods_diet_meal_id_fkey" FOREIGN KEY ("diet_meal_id") REFERENCES "diet_meals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diet_foods" ADD CONSTRAINT "diet_foods_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "foods"("id") ON DELETE CASCADE ON UPDATE CASCADE;

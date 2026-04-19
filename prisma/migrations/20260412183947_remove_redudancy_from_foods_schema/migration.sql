/*
  Warnings:

  - You are about to drop the column `calories_per_100g_in_kcal` on the `foods` table. All the data in the column will be lost.
  - You are about to drop the column `carbs_per_100g_in_grams` on the `foods` table. All the data in the column will be lost.
  - You are about to drop the column `fats_per_100g_in_grams` on the `foods` table. All the data in the column will be lost.
  - You are about to drop the column `original_amount` on the `foods` table. All the data in the column will be lost.
  - You are about to drop the column `original_unit` on the `foods` table. All the data in the column will be lost.
  - You are about to drop the column `proteins_per_100g_in_grams` on the `foods` table. All the data in the column will be lost.
  - Added the required column `normalized_calories_in_kcal` to the `foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `normalized_carbs_in_grams` to the `foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `normalized_fats_in_grams` to the `foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `normalized_proteins_in_grams` to the `foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `portion_amount` to the `foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `portion_unit` to the `foods` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "NormalizedBase" AS ENUM ('PER_100G', 'PER_100ML', 'PER_UNIT');

-- DropIndex
DROP INDEX "foods_category_idx";

-- DropIndex
DROP INDEX "foods_is_custom_idx";

-- DropIndex
DROP INDEX "foods_is_recipe_idx";

-- DropIndex
DROP INDEX "foods_name_idx";

-- DropIndex
DROP INDEX "foods_user_id_idx";

-- AlterTable
ALTER TABLE "foods" DROP COLUMN "calories_per_100g_in_kcal",
DROP COLUMN "carbs_per_100g_in_grams",
DROP COLUMN "fats_per_100g_in_grams",
DROP COLUMN "original_amount",
DROP COLUMN "original_unit",
DROP COLUMN "proteins_per_100g_in_grams",
ADD COLUMN     "normalized_calories_in_kcal" INTEGER NOT NULL,
ADD COLUMN     "normalized_carbs_in_grams" INTEGER NOT NULL,
ADD COLUMN     "normalized_fats_in_grams" INTEGER NOT NULL,
ADD COLUMN     "normalized_proteins_in_grams" INTEGER NOT NULL,
ADD COLUMN     "portion_amount" INTEGER NOT NULL,
ADD COLUMN     "portion_unit" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "foods_user_id_category_idx" ON "foods"("user_id", "category");

-- CreateIndex
CREATE INDEX "foods_user_id_is_recipe_idx" ON "foods"("user_id", "is_recipe");

-- CreateIndex
CREATE INDEX "foods_user_id_is_custom_idx" ON "foods"("user_id", "is_custom");

-- CreateIndex
CREATE INDEX "foods_user_id_name_idx" ON "foods"("user_id", "name");

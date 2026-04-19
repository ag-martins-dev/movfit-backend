/*
  Warnings:

  - Added the required column `updated_at` to the `diet_foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `calories_in_kcal` to the `foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carbs_in_grams` to the `foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fats_in_grams` to the `foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `original_amount` to the `foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `original_unit` to the `foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proteins_in_grams` to the `foods` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "diet_foods" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "foods" ADD COLUMN     "calories_in_kcal" INTEGER NOT NULL,
ADD COLUMN     "carbs_in_grams" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "fats_in_grams" INTEGER NOT NULL,
ADD COLUMN     "is_custom" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_recipe" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "original_amount" INTEGER NOT NULL,
ADD COLUMN     "original_unit" TEXT NOT NULL,
ADD COLUMN     "proteins_in_grams" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "recipe_items" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "food_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "recipe_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "recipe_items_food_id_idx" ON "recipe_items"("food_id");

-- CreateIndex
CREATE INDEX "foods_user_id_idx" ON "foods"("user_id");

-- CreateIndex
CREATE INDEX "foods_is_recipe_idx" ON "foods"("is_recipe");

-- CreateIndex
CREATE INDEX "foods_is_custom_idx" ON "foods"("is_custom");

-- AddForeignKey
ALTER TABLE "recipe_items" ADD CONSTRAINT "recipe_items_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

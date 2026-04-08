/*
  Warnings:

  - You are about to drop the column `date` on the `daily_water_consumptions` table. All the data in the column will be lost.
  - You are about to drop the column `goal_in_ml` on the `daily_water_consumptions` table. All the data in the column will be lost.
  - Added the required column `target_in_ml` to the `daily_water_consumptions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "daily_water_consumptions_user_id_date_key";

-- AlterTable
ALTER TABLE "daily_water_consumptions" DROP COLUMN "date",
DROP COLUMN "goal_in_ml",
ADD COLUMN     "target_in_ml" INTEGER NOT NULL;

/*
  Warnings:

  - You are about to drop the column `consumed_in_ml` on the `water_consumptions` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `water_consumptions` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `water_consumptions` table. All the data in the column will be lost.
  - You are about to drop the column `goal_in_ml` on the `water_consumptions` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `water_consumptions` table. All the data in the column will be lost.
  - You are about to drop the `water_consumption_histories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `amount_consumed_in_ml` to the `water_consumptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `daily_water_consumption_id` to the `water_consumptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_of_consumption` to the `water_consumptions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "water_consumption_histories" DROP CONSTRAINT "water_consumption_histories_user_id_fkey";

-- DropForeignKey
ALTER TABLE "water_consumption_histories" DROP CONSTRAINT "water_consumption_histories_water_consumption_id_fkey";

-- DropIndex
DROP INDEX "water_consumptions_user_id_date_key";

-- AlterTable
ALTER TABLE "water_consumptions" DROP COLUMN "consumed_in_ml",
DROP COLUMN "created_at",
DROP COLUMN "date",
DROP COLUMN "goal_in_ml",
DROP COLUMN "updated_at",
ADD COLUMN     "amount_consumed_in_ml" INTEGER NOT NULL,
ADD COLUMN     "daily_water_consumption_id" TEXT NOT NULL,
ADD COLUMN     "date_of_consumption" DATE NOT NULL;

-- DropTable
DROP TABLE "water_consumption_histories";

-- CreateTable
CREATE TABLE "daily_water_consumptions" (
    "id" TEXT NOT NULL,
    "goal_in_ml" INTEGER NOT NULL DEFAULT 2000,
    "consumed_in_ml" INTEGER NOT NULL DEFAULT 0,
    "date" DATE NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "daily_water_consumptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "daily_water_consumptions_user_id_key" ON "daily_water_consumptions"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "daily_water_consumptions_user_id_date_key" ON "daily_water_consumptions"("user_id", "date");

-- AddForeignKey
ALTER TABLE "daily_water_consumptions" ADD CONSTRAINT "daily_water_consumptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "water_consumptions" ADD CONSTRAINT "water_consumptions_daily_water_consumption_id_fkey" FOREIGN KEY ("daily_water_consumption_id") REFERENCES "daily_water_consumptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

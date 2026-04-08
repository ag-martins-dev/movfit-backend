/*
  Warnings:

  - Added the required column `calories_in_kcal` to the `diets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "diets" ADD COLUMN     "calories_in_kcal" INTEGER NOT NULL;

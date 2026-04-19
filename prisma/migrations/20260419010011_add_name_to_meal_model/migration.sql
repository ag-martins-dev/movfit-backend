/*
  Warnings:

  - Added the required column `name` to the `diet_meals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "diet_meals" ADD COLUMN     "name" TEXT NOT NULL;

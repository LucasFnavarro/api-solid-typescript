/*
  Warnings:

  - Added the required column `restaurant_name` to the `owner_restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."owner_restaurant" ADD COLUMN     "restaurant_name" TEXT NOT NULL;

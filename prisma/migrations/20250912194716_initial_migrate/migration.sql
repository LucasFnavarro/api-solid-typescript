/*
  Warnings:

  - You are about to drop the `owner_restaurant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `restaurants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tenants` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tenant_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."owner_restaurant" DROP CONSTRAINT "owner_restaurant_tenant_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."restaurants" DROP CONSTRAINT "restaurants_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."restaurants" DROP CONSTRAINT "restaurants_tenant_id_fkey";

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "tenant_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."owner_restaurant";

-- DropTable
DROP TABLE "public"."restaurants";

-- DropTable
DROP TABLE "public"."tenants";

-- CreateTable
CREATE TABLE "public"."tenant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tenant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

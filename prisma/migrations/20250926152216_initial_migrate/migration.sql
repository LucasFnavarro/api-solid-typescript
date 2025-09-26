/*
  Warnings:

  - You are about to drop the column `product_id` on the `categories` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."categories" DROP CONSTRAINT "categories_product_id_fkey";

-- AlterTable
ALTER TABLE "public"."categories" DROP COLUMN "product_id";

-- AlterTable
ALTER TABLE "public"."products" ADD COLUMN     "category_id" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

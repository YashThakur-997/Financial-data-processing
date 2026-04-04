/*
  Warnings:

  - Changed the type of `category` on the `financial_records` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('FOOD', 'RENT', 'SALARY', 'TRANSPORT', 'ENTERTAINMENT', 'UTILITIES', 'OTHERS');

-- AlterTable
ALTER TABLE "financial_records" DROP COLUMN "category",
ADD COLUMN     "category" "Category" NOT NULL;

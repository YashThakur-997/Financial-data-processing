-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('INCOME', 'EXPENSE');

-- CreateTable
CREATE TABLE "financial_records" (
    "id" SERIAL NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "type" "TransactionType" NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "financial_records_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "financial_records" ADD CONSTRAINT "financial_records_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

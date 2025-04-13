/*
  Warnings:

  - Changed the type of `stripeCurrentPeriodEnd` on the `user_subscription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "user_subscription" DROP COLUMN "stripeCurrentPeriodEnd",
ADD COLUMN     "stripeCurrentPeriodEnd" TIMESTAMP(3) NOT NULL;

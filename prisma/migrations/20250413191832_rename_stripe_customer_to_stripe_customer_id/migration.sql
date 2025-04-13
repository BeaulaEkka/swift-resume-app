/*
  Warnings:

  - You are about to drop the column `stripeCustomer` on the `user_subscription` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stripeCustomerId]` on the table `user_subscription` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stripeCustomerId` to the `user_subscription` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "user_subscription_stripeCustomer_key";

-- AlterTable
ALTER TABLE "user_subscription" DROP COLUMN "stripeCustomer",
ADD COLUMN     "stripeCustomerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_subscription_stripeCustomerId_key" ON "user_subscription"("stripeCustomerId");

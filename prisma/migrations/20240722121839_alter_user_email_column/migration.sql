/*
  Warnings:

  - You are about to drop the column `email` on the `orgs` table. All the data in the column will be lost.
  - Added the required column `user_email` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orgs" DROP CONSTRAINT "orgs_email_fkey";

-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "email",
ADD COLUMN     "user_email" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "orgs" ADD CONSTRAINT "orgs_user_email_fkey" FOREIGN KEY ("user_email") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

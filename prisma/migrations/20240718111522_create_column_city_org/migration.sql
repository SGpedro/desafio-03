/*
  Warnings:

  - Added the required column `city` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orgs" ADD COLUMN     "city" VARCHAR(255) NOT NULL;

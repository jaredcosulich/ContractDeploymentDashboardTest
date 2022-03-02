/*
  Warnings:

  - You are about to drop the column `email` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `profile` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "user_email_key";

-- AlterTable
ALTER TABLE "profile" ADD COLUMN     "email" TEXT;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "email";

-- CreateIndex
CREATE UNIQUE INDEX "profile_email_key" ON "profile"("email");

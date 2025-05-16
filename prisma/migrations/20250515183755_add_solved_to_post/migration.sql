/*
  Warnings:

  - You are about to drop the column `Postid` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `Solved` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `People` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_Postid_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "Postid",
DROP COLUMN "Solved",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "People";

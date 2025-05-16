/*
  Warnings:

  - A unique constraint covering the columns `[Mobile]` on the table `People` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "People_Mobile_key" ON "People"("Mobile");

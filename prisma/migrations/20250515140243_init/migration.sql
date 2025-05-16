-- CreateTable
CREATE TABLE "People" (
    "id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Mobile" TEXT NOT NULL,
    "Password" TEXT NOT NULL,

    CONSTRAINT "People_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "Postid" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Flat_no" TEXT NOT NULL,
    "Purpose" TEXT NOT NULL,
    "Mobile" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_Postid_fkey" FOREIGN KEY ("Postid") REFERENCES "People"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

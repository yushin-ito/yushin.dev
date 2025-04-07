-- CreateTable
CREATE TABLE "impressions" (
    "id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "visitorId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "impressions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "impressions_visitorId_key" ON "impressions"("visitorId");

-- CreateIndex
CREATE UNIQUE INDEX "impressions_post_id_visitorId_key" ON "impressions"("post_id", "visitorId");

-- AddForeignKey
ALTER TABLE "impressions" ADD CONSTRAINT "impressions_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

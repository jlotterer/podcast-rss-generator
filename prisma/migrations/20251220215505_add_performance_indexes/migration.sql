-- CreateIndex
CREATE INDEX "podcasts_createdAt_idx" ON "podcasts"("createdAt");

-- CreateIndex
CREATE INDEX "podcasts_userId_isActive_idx" ON "podcasts"("userId", "isActive");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE INDEX "users_createdAt_idx" ON "users"("createdAt");

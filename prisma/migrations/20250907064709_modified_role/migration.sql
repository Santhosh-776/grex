-- AlterEnum
ALTER TYPE "public"."Role" ADD VALUE 'ADMIN';

-- AlterTable
ALTER TABLE "public"."TeamMember" ADD CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id");

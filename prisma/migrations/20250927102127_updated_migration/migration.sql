/*
  Warnings:

  - The values [GUEST] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."Role_new" AS ENUM ('OWNER', 'ADMIN', 'MEMBER', 'VIEWER');
ALTER TABLE "public"."TeamMember" ALTER COLUMN "role" TYPE "public"."Role_new" USING ("role"::text::"public"."Role_new");
ALTER TYPE "public"."Role" RENAME TO "Role_old";
ALTER TYPE "public"."Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."Note" DROP CONSTRAINT "Note_meetingId_fkey";

-- AlterTable
ALTER TABLE "public"."Note" ALTER COLUMN "meetingId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Note" ADD CONSTRAINT "Note_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "public"."Meeting"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_habitId_fkey";

-- AlterTable
ALTER TABLE "Habit" ADD COLUMN     "achieved" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "Habit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

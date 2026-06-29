-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "gov_password" TEXT;

-- AlterTable
ALTER TABLE "Process" ADD COLUMN     "accident_date" TIMESTAMP(3),
ADD COLUMN     "observations" TEXT,
ADD COLUMN     "re_registration_date" TIMESTAMP(3);

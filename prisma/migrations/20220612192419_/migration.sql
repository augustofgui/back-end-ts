-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_provider_id_fkey";

-- DropIndex
DROP INDEX "User_name_key";

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

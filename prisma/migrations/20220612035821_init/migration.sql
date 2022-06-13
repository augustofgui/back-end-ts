-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

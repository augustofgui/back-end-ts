import "reflect-metadata";

import AppError from "@shared/errors/AppError";

import MockAppointmentsRepository from "../repositories/MockAppointmentsRepository";
import CreateAppointmentService from "./CreateAppointmentService";

describe("CreateAppointment", () => {
  it("should be able to create a new appointment", async () => {
    const mockAppointmentsRepository = new MockAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      mockAppointmentsRepository
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: "11223344",
    });

    expect(appointment).toHaveProperty("id");
    expect(appointment.provider_id).toBe("11223344");
  });

  it("should not be able to create two appointment with the same time", async () => {
    const mockAppointmentsRepository = new MockAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      mockAppointmentsRepository
    );

    const appointmentDate = new Date(2022, 1, 1, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: "11223344",
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: "11223344",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

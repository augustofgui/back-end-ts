import { isEqual } from "date-fns";

import Appointment from "@modules/appointments/entities/Appointment";
import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";
import ICreateAppointmentDTO from "@modules/appointments/dto/ICreateAppointmentDTO";

class MockAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public async all(): Promise<Appointment[]> {
    return this.appointments;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment({ provider_id, date });
    this.appointments.push(appointment);
    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | null> {
    const foundAppointment = this.appointments.find((appointment) =>
      isEqual(appointment.date, date)
    );
    return foundAppointment || null;
  }
}

export default MockAppointmentsRepository;

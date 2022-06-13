import Appointment from '@modules/appointments/entities/Appointment';

import ICreateAppointmentDTO from '@modules/appointments/dto/ICreateAppointmentDTO';

export default interface IAppointmentsRepository {
  all(): Promise<Appointment[]>;

  create({ provider_id, date } : ICreateAppointmentDTO ): Promise<Appointment>;

  findByDate(date: Date): Promise<Appointment | null>;

}
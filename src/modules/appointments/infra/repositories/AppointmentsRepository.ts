import { prismaClient } from '@shared/infra/database/prismaClient';

import Appointment from '@modules/appointments/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dto/ICreateAppointmentDTO';

class AppointmentsRepository implements IAppointmentsRepository {
    public async all(): Promise<Appointment[]> {
        return await prismaClient.appointment.findMany();
    }

    public async create({ provider_id, date } : ICreateAppointmentDTO ): Promise<Appointment> {
        const appointment = await prismaClient.appointment.create({
            data: {
                date,
                provider_id,
            },
        });

        return appointment;
    }

    public async findByDate(date: Date): Promise<Appointment | null> {
        const foundAppointment = await prismaClient.appointment.findFirst({
            where: {
                date: date,
            }
        });

        return foundAppointment || null;
    }
}

export default AppointmentsRepository;
import { injectable, inject } from 'tsyringe';
import AppError from "@shared/errors/AppError";

import User from '@modules/users/infra/typeorm/entities/User';
import Appointment from '../infra/typeorm/entities/Appointment';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface Request {
    user: User;
    appointment_id: string;
}

@injectable()
export default class ShowAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({ user, appointment_id }: Request): Promise<Appointment> {
        const appointment = await this.appointmentsRepository.findById(appointment_id);

        if (!appointment) {
            throw new AppError('Appointment not found');
        }
        
        if (appointment.patient.id !== user.id && appointment.doctor.id !== user.id) {
            throw new AppError(`You cannot show an another user's appointment`);
        }

        return appointment;
    }
}
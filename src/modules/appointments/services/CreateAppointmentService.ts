import { injectable, inject } from 'tsyringe';
import { isBefore } from 'date-fns';
import AppError from "@shared/errors/AppError";

import User from '@modules/users/infra/typeorm/entities/User';
import Appointment from '../infra/typeorm/entities/Appointment';

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface Request {
    patient: User;
    status: string;
    reason: string;
    date: Date;
    doctor_id: string;
}

@injectable()
export default class CreateAppointmentService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({ reason, status, date, doctor_id, patient }: Request): Promise<Appointment> {
        const doctor = await this.usersRepository.findById(doctor_id);

        if (!doctor) {
            throw new AppError('Doctor not found');
        }

        const dateIsBeforeToday = isBefore(new Date(), date);

        if (dateIsBeforeToday) {
            throw new AppError('You can not make an appointment in the past');
        }

        const appointment = await this.appointmentsRepository.create({
            reason, date, doctor, patient, status,
        });

        return appointment;
    }
}
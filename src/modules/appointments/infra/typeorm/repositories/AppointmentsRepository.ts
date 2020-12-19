import { getRepository, Repository } from "typeorm";

import Appointment from "../entities/Appointment";

import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";
import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";

export default class AppointmentsRepository implements IAppointmentsRepository {
    private ormRepository: Repository<Appointment>;

    constructor() {
        this.ormRepository = getRepository(Appointment);
    }

    public async create(data: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.ormRepository.create(data);

        await this.ormRepository.save(appointment);

        return appointment;
    }

    public async save(appointment: Appointment): Promise<void> {
        await this.ormRepository.save(appointment);
    }

    public async findById(id: string): Promise<Appointment | undefined> {
        const appointment = await this.ormRepository.findOne(id);

        return appointment;
    }
}
import User from "@modules/users/infra/typeorm/entities/User";

export default interface ICreateAppointmentDTO {
    status: string;
    reason: string;
    date: Date;
    patient: User;
    doctor: User;
}
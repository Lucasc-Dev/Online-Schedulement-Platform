export default interface ICreateAppointmentDTO {
    status: string;
    reason: string;
    date: string;
    patient_id: string;
    doctor_id: string;
}
import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateAppointmentService from "@modules/appointments/services/CreateAppointmentService";

export default class appointmentsController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { reason, date, doctor_id } = request.body;
        const { user: patient } = request;

        const createAppointment = container.resolve(CreateAppointmentService)

        const appointment = await createAppointment.execute({ 
            reason, date, doctor_id, patient 
        });
        
        return response.json(appointment);
    }
}
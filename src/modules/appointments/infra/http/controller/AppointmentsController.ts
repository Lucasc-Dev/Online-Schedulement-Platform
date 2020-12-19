import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateAppointmentService from "@modules/appointments/services/CreateAppointmentService";
import ShowAppointmentService from "@modules/appointments/services/ShowAppointmentService";

export default class appointmentsController {
    public async show(request: Request, response: Response): Promise<Response> {
        const { user } = request;
        const { appointment_id } = request.params;

        const showAppointment = container.resolve(ShowAppointmentService);

        const appointment = await showAppointment.execute({ user, appointment_id });

        return response.json(appointment);
    }

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
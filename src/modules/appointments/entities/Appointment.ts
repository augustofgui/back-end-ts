import { v4 as uuidv4 } from 'uuid';

class Appointment {
    id: string;

    provider_id: string | null;

    date: Date;

    constructor({ provider_id, date }: Omit<Appointment, 'id'>) {
        this.id = uuidv4();
        this.provider_id = provider_id;
        this.date = date;
    }
}

export default Appointment;
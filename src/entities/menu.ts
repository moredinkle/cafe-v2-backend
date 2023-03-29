import { MenuStatus } from '../utils/types';

export default class Menu {
    id: string;
    date: Date;
    status: MenuStatus;

    constructor(id: string, date: Date, status: MenuStatus) {
        this.id = id;
        this.date = date;
        this.status = status;
    }
}
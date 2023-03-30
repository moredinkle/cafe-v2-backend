import { MenuStatus } from '../utils/types';

export default class Menu {
    id: string;
    date: Date;
    status: MenuStatus;

    constructor(date: Date, status: MenuStatus) {
        this.date = date;
        this.status = status;
    }
}
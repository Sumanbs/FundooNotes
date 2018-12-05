import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class LoggerServiceService {
    constructor() {}
    static log(msg: string): void {
        console.log(msg);
    }

    static logdata(msg: string, data: any) {
        console.log(msg, data);
    }
    static data(data: any) {
        console.log(data);
    }
}

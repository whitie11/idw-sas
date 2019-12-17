export interface LeaveReg {
    LeaveId: number;
    PatientId: number;
    Type: string;
    Description: string;
    IsCurrent: boolean;
    TimeOut: Date;
    TimeRetDue: Date;
    TimeRetActual: Date;
}

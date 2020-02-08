export interface LeaveReg {
    LeaveId: number;
    PatientId: number;
    LeaveType: LeaveType;
    Description: string;
    IsCurrent: boolean;
    TimeOut: Date;
    TimeRetDue: Date;
    TimeRetActual: Date;
}

export interface LeaveType {
   Id: number;
   Code: string;
   Text: string;
}

export interface LeavePayload {
    patientId: number;
    leaveStart: Date;
    leaveEnd: Date;
}

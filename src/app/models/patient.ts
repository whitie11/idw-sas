import { LeaveReg } from './LeaveReg';

export interface Patient {
PatientId: number;
FirstName: string;
MidName: string;
LastName: string;
NHSno: string;
Birthdate: Date;
WardName: string;
LastSeen: Date;
Leave: LeaveReg;
}


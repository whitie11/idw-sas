export interface Obs {
    ObsId: number;
    patientId: number;
    ObsTime: Date;
    ObsLocation: string;
    Status: string;
    SeenBy: string;
    Notes: string;
}

export interface ObsPayload {
    patientId: number;
    obsStart: Date;
    obsEnd: Date;
}

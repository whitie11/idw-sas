import { ObsEffects } from './obs.effects';
import { PtsEffects } from './pts.effects';
import { LeaveEffects } from './leave.effects';

export const effects: any[] = [
    PtsEffects,
    ObsEffects,
    LeaveEffects

];

export * from './pts.effects';
export * from './obs.effects';
export * from './leave.effects';

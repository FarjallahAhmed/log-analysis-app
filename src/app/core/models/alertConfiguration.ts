export class AlertConfiguration {
    id!:number;
    alertName!: string;
    triggerCondition!: string;
    timeWindow!: string;
    thresholdValue!: number;
    alertDescription!: string;
    status!: boolean;
    notificationChannel!: string;
    escalationLevel!: string;
}

export interface TimelineSwitchInterface {
    name: string;
    switch: boolean;
}

export interface TimelineInterface {
    id: number;
    year: number | string;
    month: number | string;
    day: number | string;
    title: string;
    location: string;
}
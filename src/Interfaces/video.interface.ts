export interface VideoSwitchInterface {
    name: string;
    switch: boolean;
};


export const videoStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height:330,
    overflowY: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
};

export const memoryStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    overflowY: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
};

export interface VideoInterface {
    id: number;
    videoURL: string;
};
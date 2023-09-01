declare type StartCameraResponse = {
    status: boolean;
    error?: string;
    camName?: string;
    roomName?: string;
    livekitToken?: string;
    livekitServerUrl?: string;
};

declare type StartRecordRequest = {
    roomId: string;
    audioTrackId: string;
    videoTrackId: string;
};

declare type StartRecordResponse = {
    egressId: string;
    roomId: string;
    error?: string;
};

declare type StopRecordResponse = {
    egressId: string;
    roomId: string;
    error?: string;
};

declare type ControlCameraResult = {
    status: boolean;
    error?: string;
};

declare type TokenGeneratorResult = {
    status: boolean;
    error?: string;
    token?: string;
};

declare type StartRecordingResult = {
    status: boolean;
    egressId?: string;
    roomName?: string;
    error?: string;
};

declare type StopRecordingResult = {
    status: boolean;
    error?: string;
};

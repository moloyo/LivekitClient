export const CAM_PERMISSIONS = {
    room: '',
    roomJoin: true,
    canPublish: true,
    canSubscribe: true,
    roomCreate: true
};

export const VIEWER_PERMISSIONS = {
    room: '',
    roomJoin: true,
    canPublish: false,
    canSubscribe: true,
    roomAdmin: false,
    roomCreate: true
};

export const RECORDING_AGENT_PERMISSIONS = {
    room: '',
    roomJoin: true,
    canPublish: false,
    canSubscribe: true,
    roomCreate: true,
    roomAdmin: false,
    roomRecord: true,
    hidden: true
};

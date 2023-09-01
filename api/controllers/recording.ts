import axios from 'axios';
import { generateToken } from "../livekit/token_generator";
import { RECORDING_AGENT_PERMISSIONS } from '../livekit/constants';

const startRecordingCommand = "/twirp/livekit.Egress/StartTrackCompositeEgress";
const stopRecordingCommand = "/twirp/livekit.Egress/StopEgress";

export async function startRecording(audioTrackId?: string, videoTrackId?: string): Promise<StartRecordingResult> {
    const cameraRoomName = process.env.CAMERA_ROOM_NAME!; // TODO: Change this to be fetched given a camera ID (multiple cams)
    const livekitServerURL = process.env.LIVEKIT_SERVER_URL;

    const res: StartRecordingResult = { status: false }

    // Generates livekit token for the recorder
    let generatedToken = "";
    const token = await generateToken(cameraRoomName, 'RecordingAgent', RECORDING_AGENT_PERMISSIONS)
    .then(result => {
        if (result.error) {
            res.error = result.error;

            return res;
        } else {
            generatedToken = result.token!;
        }
    }).catch(error => {
        res.error = error;

        return res;
    });

    var livekitStartRecordingPayload = {
        room_name: cameraRoomName,
        audio_track_id: audioTrackId,
        video_track_id: videoTrackId,
        file: {
            file_type: "MP4",
            filepath: "{PUBLISHER_IDENTITY}/recording_{TIME}.mp4"
        }
    }

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${generatedToken}`,
        }
    };

    try {
    const response = await axios.post(`${livekitServerURL}${startRecordingCommand}`, livekitStartRecordingPayload, axiosConfig)
    .then((data) => {
        if (data.status !== 200) {;
            res.error = data.data.error;

            return res;
        }

        res.status = true;
        res.egressId = data.data.egress_id;
        return res;
    })
    } catch (ex) {
        res.error = JSON.stringify((ex as Error).message);
        return res;
    }

    return res;
}

export async function stopRecording(egressId: string): Promise<StopRecordingResult> {
    const cameraRoomName = process.env.CAMERA_ROOM_NAME!; // TODO: Change this to be fetched given a camera ID (multiple cams)
    const livekitServerURL = process.env.LIVEKIT_SERVER_URL;

    const res: StopRecordingResult = { status: false }

    // Generates livekit token for the recorder
    let generatedToken = "";
    const token = await generateToken(cameraRoomName, 'RecordingAgent', RECORDING_AGENT_PERMISSIONS)
    .then(result => {
        if (result.error) {
            res.error = result.error;

            return res;
        } else {
            generatedToken = result.token!;
        }
    }).catch(error => {
        res.error = error;

        return res;
    });

    var livekitStopRecordingPayload = {
        egress_id: egressId
    }

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Authorization": `Bearer ${generatedToken}`,
        }
    };

    try {
    const response = await axios.post(`${livekitServerURL}${stopRecordingCommand}`, livekitStopRecordingPayload, axiosConfig)
    .then((data) => {
        if (data.status !== 200) {;
            res.error = data.data.error;

            return res;
        }

        res.status = true;
        return res;
    })
    } catch (ex) {
        res.error = JSON.stringify((ex as Error).message);
        return res;
    }

    return res;
}

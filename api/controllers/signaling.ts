import { generateToken } from "../livekit/token_generator";
import { controlCamera } from "./camera";

export async function activateCamera(camId: string, userName: string): Promise<StartCameraResponse> {
    const cameraRoomName = process.env.CAMERA_ROOM_NAME!; // TODO: Change this to be fetched given a camera ID (multiple cams)
    const cameraName = process.env.CAMERA_NAME;
    const livekitServerURL = process.env.LIVEKIT_SERVER_URL;
    const cameraDeviceBaseURL = process.env.CAMERA_DEVICE_URL!;

    const res: StartCameraResponse = { status: false };

    // TODO: validate camera-2-user association if possible

    // Generates livekit token for the viewer
    let generatedToken = "";
    const token = await generateToken(cameraRoomName, userName).then(result => {
        if (result.error) {
            res.error = result.error;

            return res;
        } else {
            generatedToken = result.token!;
        }
    });

    // Activates the camera device
    const controlResult = await controlCamera(cameraDeviceBaseURL, `start?roomName=${cameraRoomName}`);
    if (!controlResult.status) {
        res.error = controlResult.error;

        return res;
    }

    res.status = true;
    res.camName = cameraName;
    res.roomName = cameraRoomName;
    res.livekitToken = generatedToken;
    res.livekitServerUrl = livekitServerURL;

    return res;
}

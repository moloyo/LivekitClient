import axios from 'axios';

export async function controlCamera(cameraURL: string, action: string): Promise<ControlCameraResult> {
    try {
        const response = await axios.get(`${cameraURL}/${action}`);

        const res: ControlCameraResult = { status: false }

        if (response.status !== 200) {;
            res.error = response.data;
        }

        res.status = true;
        return res;
      } catch (error) {
        const res: ControlCameraResult = {
            status: false,
            error: JSON.stringify(error)
        }

        return res;
      }
}

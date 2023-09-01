import { ConnectionState, ControlBar, LiveKitRoom, RoomName, useConnectionState } from "@livekit/components-react";
import Dropdown from "./dropdown";
import Form from "./form";
import InputText from "./inputText";
import Stage from "./stage";
import Button from "./button";
import { useState } from "react";
import { useSession } from "next-auth/react";
import '@livekit/components-styles';

const cameras = [
    'Camera 1',
    'Camera 2'
]

export function CameraSelector() {
    const [token, setToken] = useState('');
    const [camera, setCamera] = useState(cameras[0]);
    const { data: session } = useSession()

    async function connect() {
        try {
            const resp = await fetch(`/api/camera?camera=${camera}&username=${session?.user?.name}`);

            const data = await resp.json();

            setToken(data.livekitToken)
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>

            {token ?
                <>
                    <LiveKitRoom
                        data-lk-theme="default"
                        token={token}
                        serverUrl="https://joaquingarcia.ar"
                        connect={true} >
                        <RoomName />
                        <ConnectionState />
                        <Stage />
                        <ControlBar />
                    </LiveKitRoom>
                </>
                :
                <>
                    <Form>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Username: {session?.user?.name}</label>
                        <Dropdown label="Camera" disabled={!!token} selectedOption={camera} options={cameras} onChange={(event) => setCamera(event.target.value)}></Dropdown>
                    </Form>
                    <Button disabled={camera ? false : true} text='Connect' onClick={connect} />
                </>
            }
        </>
    )
}
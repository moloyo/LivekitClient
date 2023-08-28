"use client"
import Button from '@/components/button';
import Dropdown from '@/components/dropdown';
import Form from '@/components/form';
import InputText from '@/components/inputText';
import Stage from '@/components/stage';
import { ConnectionState, ControlBar, LiveKitRoom, RoomName } from '@livekit/components-react';
import { useEffect, useState } from 'react';

export default function Home() {
  const [token, setToken] = useState('');
  const [room, setRoom] = useState('');
  const [username, setUsername] = useState('');

  async function connect() {
    try {
      const resp = await fetch(`/get_lk_token?room=${room}&username=${username}`);
      const data = await resp.json();
      setToken(data.token);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Form>
        <InputText label="Username" value={username} onChange={(event) => setUsername(event.target.value)} />
        <Dropdown label="Camera" selectedOption={room} options={['Camera 1', 'Camera 2']} onChange={(event) => setRoom(event.target.value)}></Dropdown>
      </Form>
      {token ?
        <>
          <LiveKitRoom
            token={token}
            serverUrl="https://joaquingarcia.ar/"
            connect={true} >
            <RoomName />
            <ConnectionState />
            <Stage />
            <ControlBar />
          </LiveKitRoom>
        </>
        :
        <Button disabled={username && room ? false : true} text='Connect' onClick={connect} />
      }
    </main>
  )
}

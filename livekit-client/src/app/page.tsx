"use client"
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
      <div className='p-2'>
        <label htmlFor="username">Username: </label>
        <input disabled={token ? true : false} className='text-black' type="text" name="username" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
      </div>
      <div className='p-2'>
        <label htmlFor="room">Room: </label>
        <input disabled={token ? true : false} className='text-black' type="text" name="room" id="room" value={room} onChange={(event) => setRoom(event.target.value)} />
      </div>
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
        <button className='btn' disabled={username && room ? false : true} onClick={connect}>Connect!</button>
      }
    </main>
  )
}

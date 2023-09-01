"use client"
import { useState } from 'react';
import { loginRequest, msalConfig } from "../../authConfig.js";
import { signIn, signOut, useSession } from 'next-auth/react';
import { CameraSelector } from '../components/cameraSelector';
import Button from '@/components/button';


export default function Home() {
  const [token, setToken] = useState('');
  const [room, setRoom] = useState('');
  const [username, setUsername] = useState('');

  const { data: session, status: sessionStatus } = useSession<true>()


  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {
        sessionStatus === "loading" ?
          <>
            <h1>Loading...</h1>
          </>
          :
          session ?
            <>
              <CameraSelector></CameraSelector>
              <Button onClick={() => signOut()} text='Sign out' />
            </>
            :
            <>
              <Button onClick={() => signIn('azure-ad-b2c')} text='Sign in' />
            </>
      }
    </main>
  )
}

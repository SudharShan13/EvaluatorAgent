'use client'
import Image from 'next/image'
import { useAuthState} from 'react-firebase-hooks/auth'
import {auth} from '@/app/firebase/config'
import { useRouter } from 'next/navigation';
import {signOut} from 'firebase/auth'
import Navbar from '@/app/components/Navbar';
import { useState } from 'react';
import { useEffect } from 'react';
import ChatComponent from '@/components/ui/chatComponent'
import StreamModelOutput from '@/components/ui/StreamModelOutput';
import ChatUi from './components/chatUi';

const Home = () => {
  const [user] = useAuthState(auth);
  const router = useRouter()
  useEffect(() => {
    checkUserAuthentication();
  }, []);

  const checkUserAuthentication = () => {
    if (!user) {
      // If user is not authenticated, redirect to sign-in page
      router.push('/sign-in');
    }
  };
  
  const userSession = sessionStorage.getItem('user');

  if(!user && !userSession){
    router.push('/sign-in');
    return null;
  }
  const handleLogout = async () => {
    try {
      await signOut(auth);
      sessionStorage.removeItem('user');
      router.push('/sign-in');
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-orange-500">
        {/* <div className="bg-white p-3 w-[800px] rounded-md text-black">
          <h2 className="text-2xl">Student-Evaluator</h2>
          <ChatComponent />
        </div> */}
        {/* <StreamModelOutput/> */}
        <ChatUi />
      </main>
    </div>
  );
};

export default Home;

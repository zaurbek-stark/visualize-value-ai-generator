'use client';

import Image from 'next/image';
import AssetsGenerator from './components/AssetsGenerator';

export default function Home() {
  return (
    <main className="App">
      <div className='container'>
        <div className='logoBox'>
          <Image src="/logo.png" alt="InterviewGPT logo" width="400" height="75" />
        </div>
        <AssetsGenerator />
      </div>
    </main>
  )
}
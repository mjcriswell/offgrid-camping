'use client';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

type Campsite = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
};

export default function Home() {
  const [campsites, setCampsites] = useState<Campsite[]>([]);

  useEffect(() => {
    const fetchCampsites = async () => {
      const snapshot = await getDocs(collection(db, 'campsites'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Campsite));
      setCampsites(data);
    };
    fetchCampsites();
  }, []);

  return (
    <div>
      <Head>
        <title>Off-Grid Camping Directory</title>
      </Head>
      <main>
        <h1 className="text-3xl font-bold p-4">Explore Campsites</h1>
        <Map campsites={campsites} />
      </main>
    </div>
  );
}
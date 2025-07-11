import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { notFound } from 'next/navigation';
import Image from 'next/image';

type Props = {
  params: {
    id: string;
  };
};

export default async function CampsiteDetail({ params }: Props) {
  const docRef = doc(db, 'campsites', params.id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) return notFound();

  const campsite = snapshot.data();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{campsite.name}</h1>
      <p className="text-gray-700 mb-4">{campsite.description}</p>
      <Image
        src={campsite.imageUrl}
        alt={campsite.name}
        width={800}
        height={500}
        className="rounded mb-4"
      />
      <p className="text-sm text-gray-600">
        Coordinates: {campsite.latitude}, {campsite.longitude}
      </p>
      <Link
        href="/"
        className="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
      >
        ← Back to Map
      </Link>
    </div>
  );
}
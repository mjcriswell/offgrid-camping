'use client';
import mapboxgl from 'mapbox-gl';
import { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

type Campsite = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
};

type Props = {
  campsites: Campsite[];
};

export default function Map({ campsites }: Props) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-98.5795, 39.8283],
      zoom: 4,
    });

    campsites.forEach(site => {
      const marker = new mapboxgl.Marker()
        .setLngLat([site.longitude, site.latitude])
        .setPopup(new mapboxgl.Popup().setText(site.name))
        .addTo(map);

      marker.getElement().addEventListener('click', () => {
        router.push(`/campsite/${site.id}`);
      });
    });

    return () => map.remove();
  }, [campsites, router]);

  return <div ref={mapContainer} className="h-[70vh] w-full" />;
}
'use client';

import 'leaflet/dist/leaflet.css';
import { CircleMarker, MapContainer, Marker, Polyline, TileLayer, Tooltip, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import { DivIcon } from 'leaflet';
import type { ExplorerItem, Place, RouteItem } from '@/lib/types';
import { isRoute } from '@/lib/data';

interface TerritoryMapProps {
  items: ExplorerItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const routeIcon = new DivIcon({
  className: '',
  html: '<div style="width:18px;height:18px;border-radius:9999px;background:#4f5a49;border:3px solid #f7f3ec;box-shadow:0 2px 10px rgba(0,0,0,.18);"></div>',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

function colorForPlace(category: Place['category']) {
  switch (category) {
    case 'ristoranti':
      return '#b9704f';
    case 'produttori':
      return '#4f5a49';
    case 'borghi-luoghi':
      return '#75655a';
    case 'attivita-outdoor':
      return '#596f7f';
    case 'mare':
      return '#3b82c8';
  }
}

export default function TerritoryMap({ items, selectedId, onSelect }: TerritoryMapProps) {
  return (
    <MapContainer center={[43.23, 13.44]} zoom={10} scrollWheelZoom className="min-h-[420px] md:min-h-[600px]">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        className="map-tile"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      {items.map((item) =>
        isRoute(item) ? (
          <RouteLayer
            key={item.id}
            item={item}
            selected={selectedId === item.id}
            onSelect={onSelect}
          />
        ) : (
          <PlaceLayer
            key={item.id}
            item={item}
            selected={selectedId === item.id}
            onSelect={onSelect}
          />
        )
      )}
    </MapContainer>
  );
}

function PlaceLayer({
  item,
  selected,
  onSelect,
}: {
  item: Place;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  useFlyToOnSelect({
    selected,
    lat: item.lat,
    lng: item.lng,
  });

  return (
    <CircleMarker
      center={[item.lat, item.lng]}
      radius={selected ? 14 : 8}
      pathOptions={{
        color: selected ? '#1e1d1b' : '#f7f3ec',
        weight: selected ? 4 : 2,
        fillColor: colorForPlace(item.category),
        fillOpacity: selected ? 1 : 0.9,
      }}
      eventHandlers={{
        click: () => onSelect(item.id),
      }}
    >
      <Tooltip direction="top" offset={[0, -8]} opacity={1}>
        {item.title}
      </Tooltip>
    </CircleMarker>
  );
}

function RouteLayer({
  item,
  selected,
  onSelect,
}: {
  item: RouteItem;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  useFlyToOnSelect({
    selected,
    lat: item.lat,
    lng: item.lng,
  });

  return (
    <>
      <Polyline
        positions={item.polyline}
        pathOptions={{
          color: selected ? '#1e1d1b' : '#4f5a49',
          weight: selected ? 5 : 4,
          opacity: 0.85,
        }}
        eventHandlers={{
          click: () => onSelect(item.id),
        }}
      />
      <Marker
        position={[item.lat, item.lng]}
        icon={routeIcon}
        eventHandlers={{
          click: () => onSelect(item.id),
        }}
      >
        <Tooltip direction="top" offset={[0, -8]} opacity={1}>
          {item.title}
        </Tooltip>
      </Marker>
    </>
  );
}

function useFlyToOnSelect({
  selected,
  lat,
  lng,
}: {
  selected: boolean;
  lat: number;
  lng: number;
}) {
  const map = useMap();

  useEffect(() => {
    if (!selected) return;
    map.flyTo([lat, lng], Math.max(map.getZoom(), 11), {
      duration: 0.9,
    });
  }, [selected, lat, lng, map]);
}

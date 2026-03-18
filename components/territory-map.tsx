'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Polyline, TileLayer, Tooltip, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { useEffect, useMemo } from 'react';
import L, { DivIcon } from 'leaflet';
import type { ExplorerItem, Place, RouteItem } from '@/lib/types';
import { isRoute, categoryLabels } from '@/lib/data';

export interface TerritoryMapProps {
  items: ExplorerItem[];
  selectedId: string | null;
  hoveredId: string | null;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}

// ── palette ─────────────────────────────────────────────────────────

const placeColors: Record<Place['category'], string> = {
  ristoranti: '#b9704f',
  produttori: '#4f5a49',
  'borghi-luoghi': '#75655a',
  'attivita-outdoor': '#596f7f',
  mare: '#3b82c8',
};

const difficultyColors: Record<RouteItem['difficulty'], string> = {
  facile: '#5a8a4a',
  media: '#c08b3e',
  impegnativa: '#a63d40',
};

const difficultyLabels: Record<RouteItem['difficulty'], string> = {
  facile: 'Facile',
  media: 'Media',
  impegnativa: 'Impegnativa',
};

// ── icons ───────────────────────────────────────────────────────────

function makePlaceIcon(color: string, size: number, border: string, shadow: string) {
  return new DivIcon({
    className: '',
    html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};border:${border};box-shadow:${shadow};transition:all .15s ease;"></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function makeStartIcon(color: string, size: number, borderColor: string) {
  const dot = Math.round(size * 0.28);
  return new DivIcon({
    className: '',
    html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};border:3px solid ${borderColor};box-shadow:0 2px 8px rgba(0,0,0,.22);display:flex;align-items:center;justify-content:center;transition:all .15s ease;"><div style="width:${dot}px;height:${dot}px;border-radius:50%;background:white;opacity:.85;"></div></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function createClusterIcon(cluster: { getChildCount: () => number }) {
  const count = cluster.getChildCount();
  return new DivIcon({
    className: '',
    html: `<div style="width:36px;height:36px;border-radius:50%;background:rgba(79,90,73,.12);display:flex;align-items:center;justify-content:center;"><div style="width:26px;height:26px;border-radius:50%;background:#4f5a49;color:#f7f3ec;font-size:12px;font-weight:600;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,.18);">${count}</div></div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
}

// ── main ────────────────────────────────────────────────────────────

export default function TerritoryMap({
  items,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
}: TerritoryMapProps) {
  const places = useMemo(() => items.filter((i): i is Place => !isRoute(i)), [items]);
  const routes = useMemo(() => items.filter((i): i is RouteItem => isRoute(i)), [items]);

  return (
    <MapContainer
      center={[43.23, 13.44]}
      zoom={10}
      scrollWheelZoom
      className="min-h-[420px] md:min-h-[600px]"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        className="map-tile"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      {routes.map((item) => (
        <RouteLayer
          key={item.id}
          item={item}
          selected={selectedId === item.id}
          hovered={hoveredId === item.id}
          onSelect={onSelect}
          onHover={onHover}
        />
      ))}

      <MarkerClusterGroup
        chunkedLoading
        maxClusterRadius={40}
        spiderfyOnMaxZoom
        iconCreateFunction={createClusterIcon}
      >
        {places.map((item) => (
          <PlaceLayer
            key={item.id}
            item={item}
            selected={selectedId === item.id}
            hovered={hoveredId === item.id}
            onSelect={onSelect}
            onHover={onHover}
          />
        ))}
      </MarkerClusterGroup>

      <MapLegend items={items} />
    </MapContainer>
  );
}

// ── place marker ────────────────────────────────────────────────────

function PlaceLayer({
  item,
  selected,
  hovered,
  onSelect,
  onHover,
}: {
  item: Place;
  selected: boolean;
  hovered: boolean;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}) {
  const color = placeColors[item.category];

  const icon = useMemo(() => {
    if (selected)
      return makePlaceIcon(color, 22, '3px solid #1e1d1b', '0 0 0 4px rgba(30,29,27,.12), 0 2px 8px rgba(0,0,0,.2)');
    if (hovered)
      return makePlaceIcon(color, 16, '2px solid #f7f3ec', '0 0 0 4px rgba(0,0,0,.08), 0 2px 6px rgba(0,0,0,.2)');
    return makePlaceIcon(color, 14, '2px solid #f7f3ec', '0 1px 4px rgba(0,0,0,.18)');
  }, [color, selected, hovered]);

  useFlyToOnSelect({ selected, lat: item.lat, lng: item.lng });

  return (
    <Marker
      position={[item.lat, item.lng]}
      icon={icon}
      eventHandlers={{
        click: () => onSelect(item.id),
        mouseover: () => onHover(item.id),
        mouseout: () => onHover(null),
      }}
    >
      <Tooltip direction="top" offset={[0, -8]} opacity={1}>
        {item.title}
      </Tooltip>
    </Marker>
  );
}

// ── route layer ─────────────────────────────────────────────────────

function RouteLayer({
  item,
  selected,
  hovered,
  onSelect,
  onHover,
}: {
  item: RouteItem;
  selected: boolean;
  hovered: boolean;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}) {
  const color = difficultyColors[item.difficulty];
  const highlighted = selected || hovered;

  const icon = useMemo(() => {
    if (selected) return makeStartIcon(color, 24, '#1e1d1b');
    if (hovered) return makeStartIcon(color, 22, '#f7f3ec');
    return makeStartIcon(color, 20, '#f7f3ec');
  }, [color, selected, hovered]);

  useFitBoundsOnSelect(selected, item.polyline);

  return (
    <>
      <Polyline
        positions={item.polyline}
        pathOptions={{
          color: highlighted ? '#1e1d1b' : color,
          weight: highlighted ? 5 : 3,
          opacity: highlighted ? 0.95 : 0.75,
        }}
        eventHandlers={{
          click: () => onSelect(item.id),
          mouseover: () => onHover(item.id),
          mouseout: () => onHover(null),
        }}
      />
      <Marker
        position={[item.lat, item.lng]}
        icon={icon}
        eventHandlers={{
          click: () => onSelect(item.id),
          mouseover: () => onHover(item.id),
          mouseout: () => onHover(null),
        }}
      >
        <Tooltip direction="top" offset={[0, -10]} opacity={1}>
          {item.title}
        </Tooltip>
      </Marker>
    </>
  );
}

// ── map hooks ───────────────────────────────────────────────────────

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
    map.flyTo([lat, lng], Math.max(map.getZoom(), 12), { duration: 0.9 });
  }, [selected, lat, lng, map]);
}

function useFitBoundsOnSelect(selected: boolean, polyline: [number, number][]) {
  const map = useMap();
  useEffect(() => {
    if (!selected || polyline.length === 0) return;
    const bounds = L.latLngBounds(polyline as L.LatLngTuple[]);
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
  }, [selected, polyline, map]);
}

// ── legend ──────────────────────────────────────────────────────────

function MapLegend({ items }: { items: ExplorerItem[] }) {
  const map = useMap();

  const { placeCategories, difficulties } = useMemo(() => {
    const pc = new Set<Place['category']>();
    const d = new Set<RouteItem['difficulty']>();
    for (const item of items) {
      if (isRoute(item)) d.add(item.difficulty);
      else pc.add(item.category);
    }
    return { placeCategories: pc, difficulties: d };
  }, [items]);

  useEffect(() => {
    if (placeCategories.size === 0 && difficulties.size === 0) return;

    const legend = new L.Control({ position: 'bottomleft' });

    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'map-legend');
      let html = '';

      for (const cat of placeCategories) {
        html += `<div class="map-legend-item"><span class="map-legend-dot" style="background:${placeColors[cat]}"></span>${categoryLabels[cat]}</div>`;
      }

      if (placeCategories.size > 0 && difficulties.size > 0) {
        html += '<div class="map-legend-sep"></div>';
      }

      for (const d of difficulties) {
        html += `<div class="map-legend-item"><span class="map-legend-line" style="background:${difficultyColors[d]}"></span>${difficultyLabels[d]}</div>`;
      }

      div.innerHTML = html;
      L.DomEvent.disableClickPropagation(div);
      return div;
    };

    legend.addTo(map);
    return () => {
      legend.remove();
    };
  }, [map, placeCategories, difficulties]);

  return null;
}

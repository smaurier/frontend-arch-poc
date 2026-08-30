export interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  label: string;
  status?: 'ok' | 'warning' | 'critical';
}

export interface MapViewProps {
  markers: MapMarker[];
  center?: [number, number]; // [lat, lng]
  zoom?: number;
}

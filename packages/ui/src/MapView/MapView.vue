<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { MapViewProps } from './MapView.types';

const props = withDefaults(defineProps<MapViewProps>(), {
  center: () => [45.7578, 4.832] as [number, number],
  zoom: 12,
});

const mapContainer = ref<HTMLDivElement | null>(null);
let mapInstance: L.Map | null = null;
let markerLayer: L.Marker[] = [];

function truckIcon(status?: string): L.DivIcon {
  const statusClass =
    status === 'critical'
      ? 'truck-marker--critical'
      : status === 'warning'
        ? 'truck-marker--warning'
        : 'truck-marker--ok';
  return L.divIcon({
    className: `truck-marker ${statusClass}`,
    html: '<span style="font-size:24px;">🚚</span>',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

function renderMarkers() {
  if (!mapInstance) return;
  markerLayer.forEach((m) => m.remove());
  markerLayer = props.markers.map((m) =>
    L.marker([m.lat, m.lng], { icon: truckIcon(m.status) })
      .addTo(mapInstance!)
      .bindPopup(`<strong>${m.id}</strong><br>${m.label}`),
  );
}

onMounted(() => {
  if (!mapContainer.value) return;
  mapInstance = L.map(mapContainer.value).setView(props.center, props.zoom);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
  }).addTo(mapInstance);
  renderMarkers();
});

onUnmounted(() => {
  if (mapInstance) {
    mapInstance.remove();
    mapInstance = null;
  }
});

watch(() => props.markers, renderMarkers, { deep: true });
</script>

<template>
  <div
    ref="mapContainer"
    data-testid="map-container"
    role="region"
    aria-label="Fleet map showing truck positions"
    class="w-full h-full min-h-[400px] rounded-md border border-border overflow-hidden"
  />
</template>

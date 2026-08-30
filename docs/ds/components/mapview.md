# MapView

Wraps Leaflet with declarative Vue markers.

## Import

```ts
import { MapView, type MapMarker } from '@frontend-arch-poc/ui';
```

## Basic usage

```vue
<script setup lang="ts">
const markers: MapMarker[] = [{ id: 'a', lat: 45.75, lng: 4.83, label: 'Point A' }];
</script>

<template>
  <div style="height: 500px">
    <MapView :markers="markers" />
  </div>
</template>
```

## API

| Prop      | Type          | Default     | Description         |
| --------- | ------------- | ----------- | ------------------- |
| `markers` | `MapMarker[]` | required    | Points to render    |
| `center`  | `[lat, lng]`  | Lyon center | Initial view center |
| `zoom`    | `number`      | `12`        | Initial zoom        |

## MapMarker

```ts
interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  label: string;
  status?: 'ok' | 'warning' | 'critical';
}
```

## Notes

- OpenStreetMap tiles by default. For production traffic, host tiles yourself or use a paid provider.
- For higher volumes (thousands of markers), consider migrating to MapLibre GL for GPU rendering.

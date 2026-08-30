import { ref, onMounted, onUnmounted, type Ref } from 'vue';

export interface SseOptions<TEvent> {
  url: string;
  eventName?: string;
  snapshotUrl?: string;
  onSnapshot?: (data: TEvent) => void;
  onEvent: (data: TEvent) => void;
  minBackoffMs?: number;
  maxBackoffMs?: number;
}

export interface SseHandle {
  connected: Ref<boolean>;
  attempt: Ref<number>;
  close: () => void;
}

/**
 * Server-Sent Events client with exponential backoff reconnect and optional
 * snapshot resync on (re)connect.
 */
export function useSSE<TEvent = unknown>(options: SseOptions<TEvent>): SseHandle {
  const connected = ref(false);
  const attempt = ref(0);

  const minBackoff = options.minBackoffMs ?? 1000;
  const maxBackoff = options.maxBackoffMs ?? 30_000;
  const eventName = options.eventName ?? 'message';

  let source: EventSource | null = null;
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  let closedByUser = false;

  async function fetchSnapshot(): Promise<void> {
    if (!options.snapshotUrl || !options.onSnapshot) return;
    try {
      const res = await fetch(options.snapshotUrl);
      if (!res.ok) return;
      const data = (await res.json()) as TEvent;
      options.onSnapshot(data);
    } catch {
      /* snapshot best-effort */
    }
  }

  function scheduleReconnect(): void {
    if (closedByUser) return;
    const delay = Math.min(minBackoff * Math.pow(2, attempt.value), maxBackoff);
    reconnectTimer = setTimeout(() => connect(), delay);
  }

  function connect(): void {
    if (closedByUser) return;
    void fetchSnapshot();

    source = new EventSource(options.url);

    source.addEventListener('open', () => {
      connected.value = true;
      attempt.value = 0;
    });

    source.addEventListener(eventName, (evt: MessageEvent<string>) => {
      try {
        const data = JSON.parse(evt.data) as TEvent;
        options.onEvent(data);
      } catch {
        /* malformed payload */
      }
    });

    source.addEventListener('error', () => {
      connected.value = false;
      if (source) {
        source.close();
        source = null;
      }
      attempt.value += 1;
      scheduleReconnect();
    });
  }

  function close(): void {
    closedByUser = true;
    if (reconnectTimer !== null) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }
    if (source) {
      source.close();
      source = null;
    }
    connected.value = false;
  }

  onMounted(() => connect());
  onUnmounted(() => close());

  return { connected, attempt, close };
}

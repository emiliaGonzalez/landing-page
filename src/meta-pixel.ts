// Meta Pixel (mismo patrón que Baile Inolvidable). El Pixel ID es un
// identificador público de cliente, pero NO se hardcodea aquí: se define en
// .env como PUBLIC_META_PIXEL_ID con TU pixel de Unlimited Code (no el de Baile).
// Sin ID → todo queda en no-op.
const PIXEL_ID = (import.meta.env as Record<string, string | undefined>).PUBLIC_META_PIXEL_ID || "4266967373518556";

// Allowlist: solo parámetros de comercio genéricos llegan a Meta.
const ALLOWED_PARAMS = ["value", "currency", "content_name"];

interface Fbq {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: unknown;
  loaded: boolean;
  version: string;
}

function bootstrapFbq() {
  const w = window as unknown as { fbq?: Fbq; _fbq?: Fbq };
  if (w.fbq) return;
  const n: Fbq = ((...args: unknown[]) => {
    if (n.callMethod) n.callMethod.apply(n, args);
    else n.queue.push(args);
  }) as Fbq;
  w.fbq = n;
  if (!w._fbq) w._fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  const first = document.getElementsByTagName("script")[0];
  first.parentNode?.insertBefore(script, first);
}

/** Inicializa el pixel una sola vez y dispara el PageView del pageload. */
export function initMetaPixel() {
  if (typeof window === "undefined" || !PIXEL_ID) return;
  const w = window as unknown as { __metaPixelInitialized?: boolean; fbq: Fbq };
  if (w.__metaPixelInitialized) return;
  bootstrapFbq();
  w.fbq("init", PIXEL_ID);
  w.fbq("track", "PageView");
  w.__metaPixelInitialized = true;
}

/** Dispara un evento a Meta, filtrando todo lo que no esté en el allowlist. */
export function trackMetaEvent(name: string, params?: Record<string, unknown>) {
  const w = window as unknown as { fbq?: Fbq };
  if (typeof window === "undefined" || !PIXEL_ID || !w.fbq) return;
  const safe: Record<string, unknown> = {};
  if (params) for (const k of ALLOWED_PARAMS) if (params[k] !== undefined) safe[k] = params[k];
  w.fbq("track", name, safe);
}

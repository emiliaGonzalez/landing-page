import posthog from "posthog-js";
import { datadogRum } from "@datadog/browser-rum";
import { datadogLogs } from "@datadog/browser-logs";

// ─────────────────────────────────────────────────────────────────────────────
// Mismo patrón que Baile Inolvidable (Julia). Estos son identificadores PÚBLICOS
// de cliente (viven en el bundle del browser por diseño). Se pueden sobrescribir
// con variables PUBLIC_* en un .env; si no, usan el proyecto "Julia" por defecto.
// NUNCA mandes datos sensibles en las properties — solo nombres de evento y
// metadatos de comportamiento.
// ─────────────────────────────────────────────────────────────────────────────
const E = import.meta.env as Record<string, string | undefined>;

const POSTHOG_KEY = E.PUBLIC_POSTHOG_KEY || "phc_NzTa6LVEGwk0GvuyAY4SsMlhqVp39YWkWmlsC1BpJJl";
const POSTHOG_HOST = E.PUBLIC_POSTHOG_HOST || "https://d3raulgin79psw.cloudfront.net";
const DD_APP_ID = E.PUBLIC_DD_RUM_APPLICATION_ID || "01f3d868-c236-4e24-86dc-215c4b31f741";
const DD_TOKEN = E.PUBLIC_DD_RUM_CLIENT_TOKEN || "pub4b516065ea95b5bd04970d56dc747c61";
const DD_SITE = E.PUBLIC_DD_SITE || "us5.datadoghq.com";
const DD_SERVICE = E.PUBLIC_DD_SERVICE || "unlimited-code";
const DD_ENV = E.PUBLIC_DD_ENV || "dev";
const DD_VERSION = E.PUBLIC_DD_VERSION || "1.0.0";

export function initAnalytics() {
  if (typeof window === "undefined") return;

  // PostHog — analítica de producto (pageviews + pageleave), igual que Baile.
  if (POSTHOG_KEY && POSTHOG_HOST && !(posthog as unknown as { __loaded?: boolean }).__loaded) {
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      person_profiles: "identified_only",
      capture_pageview: true,
      capture_pageleave: true,
    });
    posthog.register({ environment: DD_ENV });
  }

  // Datadog RUM — Real User Monitoring (no-op si falta el token, como en Baile).
  if (DD_TOKEN && DD_APP_ID) {
    datadogRum.init({
      applicationId: DD_APP_ID,
      clientToken: DD_TOKEN,
      site: DD_SITE,
      service: DD_SERVICE,
      env: DD_ENV,
      version: DD_VERSION,
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackUserInteractions: true,
      trackResources: true,
      trackLongTasks: true,
      defaultPrivacyLevel: "mask-user-input",
    });
  }

  // Datadog Logs — errores del browser → logs (solo muestrea en producción).
  if (DD_TOKEN) {
    datadogLogs.init({
      clientToken: DD_TOKEN,
      site: DD_SITE,
      service: DD_SERVICE,
      env: DD_ENV,
      version: DD_VERSION,
      forwardErrorsToLogs: true,
      sessionSampleRate: DD_ENV === "production" ? 100 : 0,
    });
  }
}

/** Captura un evento de comportamiento en PostHog. No-op si no se inicializó. */
export function track(event: string, properties: Record<string, unknown> = {}) {
  if (typeof window !== "undefined" && (posthog as unknown as { __loaded?: boolean }).__loaded) {
    posthog.capture(event, properties);
  }
}

export function trackPageView(page: string) {
  // V1: keep telemetry lightweight and non-blocking.
  console.info("[telemetry] page_view", { page, at: new Date().toISOString() });
}

export function trackJSError(error: unknown, context: string) {
  console.error("[telemetry] js_error", {
    context,
    error: error instanceof Error ? error.message : String(error),
    at: new Date().toISOString(),
  });
}

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

function init() {
    Sentry.init({
      dsn: "https://1c82057e5bf74b2ab5233802d944ab69@o1067902.ingest.sentry.io/6061976",
      integrations: [new Integrations.BrowserTracing()],

      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,
    });
}

function log(error) {
    Sentry.captureException(error);
    }

const logger = {
    init,
    log
}

export default logger;

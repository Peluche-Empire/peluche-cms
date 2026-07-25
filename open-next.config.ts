import { defineCloudflareConfig } from '@opennextjs/cloudflare/config'
import staticAssetsIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache'

export default defineCloudflareConfig({
  // Serves prerendered pages (currently just `/`) straight from Workers static assets
  // instead of re-rendering them in the Worker on every request. Safe here because nothing
  // in this app uses ISR revalidation — prerendered output only changes on deploy.
  incrementalCache: staticAssetsIncrementalCache,
})

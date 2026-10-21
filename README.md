# bubble&bloom · BehaviorFlow demo shop

A polished, playful Next.js App Router storefront designed for testing real user journeys.

## Run it

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Other useful commands are `npm run build`, `npm test`, and `npm run e2e` (with Playwright browsers installed).

## Routes

- `/` and `/shop` — responsive catalog with category filters
- `/products/[id]` — product detail
- `/cart`, `/checkout`, `/order-confirmation` — localStorage cart and demo order flow
- `/analytics` — live mock event stream; `/api/collect` accepts events
- `/lab` — noindex fault-state controls for QA
- `/design` — visual token preview

The checkout is intentionally non-production: no payment data is sent or persisted. Configure `NEXT_PUBLIC_ANALYTICS_ENDPOINT` in `.env.local` to point analytics at a test collector.

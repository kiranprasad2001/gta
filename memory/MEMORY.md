# GTA Transit App Memory

## Project Overview
- React + TypeScript + Vite app for GTA transit information
- Uses Fluent UI v9 (@fluentui/react-components), react-router, @tanstack/react-query
- Maps via OpenLayers + rlayers (RMap, RLayerVector, etc.)
- Cloudflare Workers proxy at workers/gta-proxy.js

## Key Architecture
- `src/App.tsx`: Root layout. NavBar in header on desktop (>=800px), fixed bottom on mobile (<800px)
- `src/components/nav/BaseBarComponents.tsx`: Nav items. Text labels shown at >=600px, icon-only below
- `src/styles/fluent.ts`: Fluent UI makeStyles — `sideNavButton`, `bottomNavButton`, `smallRoundNavButton`
- `src/components/map/LiveMap.tsx`: Full-screen live map with vehicle positions, stop info panels
- `src/components/search/StopSearch.tsx`: Stop number search form (compact mode when bookmarks exist)

## Transit Data Sources
- **TTC vehicles**: UmoIQ XML feed (`https://retro.umoiq.com/...`) — live ~1000 vehicles, refreshes 15s
- **TTC subways**: NTAS API proxied via Cloudflare Worker (`/gta-proxy?agency=ttc-subway&stopCode=...`)
- **GO Transit**: Metrolinx API (needs API key), proxied via worker — stop arrivals only, no vehicle positions
- **YRT/MiWay/Brampton**: No live vehicle positions yet; would need GTFS-RT protobuf parsing + proxy

## Mobile Layout (post-fix)
- Bottom nav: icon-only (<600px), icon+text (600-799px), side nav (>=800px)
- Nav button min-width overflow was fixed with `minWidth: "0px"` + `width: "100%"` in bottomNavButton
- `main` padding reduced to 16px horizontal on mobile (was 32px)
- StopSearch `.title` changed from `min-width: fit-content` to `min-width: 0`
- Nearby controls have `flex-wrap: wrap`

## Map Features
- Locate-me button (⊕): floating button at `bottom: 96px; right: 16px` in LiveMap
  - Pans to user's GPS location; requests location if not yet obtained
- Toolbar: search input + filter button with agency/route-type checkboxes
- Toolbar filter label hidden on mobile (<600px) to save space
- Stop markers appear at zoom >= 14; subway lines always visible

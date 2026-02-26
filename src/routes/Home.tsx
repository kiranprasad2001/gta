import { lazy, Suspense } from "react";

const LiveMap = lazy(() => import("../components/map/LiveMap.js"));

/**
 * Home — Full-screen live map view.
 * Nearby and Alerts are now separate pages accessible from the left sidebar.
 */
export default function Home() {
  return (
    <main className="map-home">
      <Suspense fallback={<div style={{ padding: "2rem", color: "#888" }}>Loading map...</div>}>
        <LiveMap />
      </Suspense>
    </main>
  );
}

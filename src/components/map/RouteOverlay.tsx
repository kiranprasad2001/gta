import { useQuery } from "@tanstack/react-query";
import { LineString, Point } from "ol/geom.js";
import "ol/ol.css";
import { fromLonLat } from "ol/proj.js";
import { Stroke, Style } from "ol/style.js";
import { RFeature, RLayerVector, ROverlay } from "rlayers";

import { ttcRouteWithPaths } from "../fetch/queries.js";
import styles from "./LiveMap.module.css";

interface RouteOverlayProps {
  routeTag: string;
}

/**
 * Route path overlay — draws the full route polyline and stop dots
 * when a vehicle is selected.
 */
export default function RouteOverlay({ routeTag }: RouteOverlayProps) {
  const { data: routeData } = useQuery(ttcRouteWithPaths(routeTag));

  if (!routeData) return null;

  const lineStyle = new Style({
    stroke: new Stroke({
      color: routeData.color || "#DA291C",
      width: 4,
    }),
  });

  return (
    <>
      {/* Route path polylines */}
      <RLayerVector zIndex={5}>
        {routeData.paths.map((path, pathIdx) => {
          const coords = path.map((p) => fromLonLat([p.lon, p.lat]));
          if (coords.length < 2) return null;
          return (
            <RFeature
              key={`path-${pathIdx}`}
              geometry={new LineString(coords)}
              style={lineStyle}
            />
          );
        })}
      </RLayerVector>

      {/* Route stop dots */}
      <RLayerVector zIndex={6}>
        {routeData.stops.map((stop) => (
          <RFeature
            key={`stop-${stop.tag}`}
            geometry={new Point(fromLonLat([stop.lon, stop.lat]))}
          >
            <ROverlay>
              <div className={styles.routeStopDot} title={stop.title} />
            </ROverlay>
          </RFeature>
        ))}
      </RLayerVector>
    </>
  );
}

import { Agent } from "@atproto/api";
import { queryOptions, useQuery } from "@tanstack/react-query";

// import GtfsRealtimeBindings from "gtfs-realtime-bindings";
import type {
  EtaPredictionJson,
  RouteJson,
  RoutesJson,
  SubwayClosureJson,
} from "../../models/etaJson.js";
import type { ArrivalPrediction } from "../../models/transit.js";
import type {
  BasicLine,
  NextBusBasic,
  parsedVehicleLocation,
  SubwayStations,
  SubwayStop,
} from "../../models/ttc.js";
import type { UnifiedStop } from "../../models/unified.js";
import { normalizeGoTransit, normalizeTtc } from "./adapters.js";

export const ttcStopPrediction = (stopId: number) =>
  queryOptions<EtaPredictionJson>({
    queryKey: [`ttc-stop-${stopId}`],
    queryFn: async () => {
      const response = await fetch(
        `https://webservices.umoiq.com/service/publicJSONFeed?command=predictions&a=ttc&stopId=${stopId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
    refetchInterval: 60 * 1000,
    placeholderData: (prev) => prev,
  });

export const ttcSubwayPrediction = (stopCode: string) =>
  queryOptions({
    queryKey: [`ttc-subway-stop-${stopCode}`],
    queryFn: async () => {
      // Use our Cloudflare worker proxy to fetch the NTAS API data
      const response = await fetch(
        `http://localhost:8787/?agency=ttc-subway&stopCode=${stopCode}` // For dev. In prod it would point to the deployed worker.
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    refetchInterval: 30 * 1000, // Subway ETAs update slightly faster
    placeholderData: (prev) => prev,
  });

export const fetchSubwayClosure = (date: string) =>
  queryOptions<SubwayClosureJson[]>({
    queryKey: [`ttc-subway-closure-${date}`],
    queryFn: async () => {
      const response = await fetch(
        `https://thomassth.github.io/to-bus-stations/data/ttc/subway-closures/${date}.json`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
    placeholderData: (prev) => prev,
  });

export const fetchSubwayClosureLastUpdated = queryOptions<string>({
  queryKey: ["ttc-subway-closure-last-updated"],
  staleTime: 60 * 60 * 1000,
  queryFn: async () => {
    const response = await fetch(
      "https://thomassth.github.io/to-bus-stations/data/ttc/subway-closures/lastupdated"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.text();
  },
});

/** @deprecated ttcBusPredictionsBasic */
export const ttcLineStopPrediction = (line: number, stopNum: number) =>
  queryOptions<EtaPredictionJson>({
    queryKey: [`ttc-line-stop-${line}-${stopNum}`],
    queryFn: async () => {
      const response = await fetch(
        `https://webservices.umoiq.com/service/publicJSONFeed?command=predictions&a=ttc&r=${line}&s=${stopNum}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const resp = await response.json();
      if (resp.Error) {
        return Promise.reject(resp);
      }

      return resp;
    },
    refetchInterval: 60 * 1000,
    placeholderData: (prev) => prev,
  });

export const ttcBusPredictionsBasic = (props: {
  stopNum: number;
  lineNum: number;
}) =>
  queryOptions<NextBusBasic[]>({
    queryKey: [`ttc-bus-basic-${props.lineNum}-${props.stopNum}`],
    queryFn: async () => {
      const response = await fetch(
        `https://www.ttc.ca/ttcapi/routedetail/GetNextBuses?routeId=${props.lineNum}&stopCode=${props.stopNum}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
    refetchInterval: 60 * 1000,
    placeholderData: (prev) => prev,
  });

/** @deprecated use ttcLinesBasic */
export const ttcLines = queryOptions<RoutesJson["body"]>({
  queryKey: ["ttc-lines"],
  queryFn: async () => {
    const response = await fetch(
      "https://webservices.umoiq.com/service/publicJSONFeed?command=routeList&a=ttc"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  },
  staleTime: 24 * 60 * 60 * 1000,
  refetchInterval: 60 * 1000,
  placeholderData: (prev) => prev,
});

export const ttcLinesBasic = queryOptions<BasicLine[]>({
  queryKey: ["ttc-lines-basic"],
  queryFn: async () => {
    const response = await fetch(
      "https://www.ttc.ca/ttcapi/routedetail/listroutes"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  },
  staleTime: 24 * 60 * 60 * 1000,
  refetchInterval: 60 * 1000,
  placeholderData: (prev) => prev,
});

/** @deprecated use ttcRouteBasic */
export const ttcRoute = (line: number) =>
  queryOptions<RouteJson>({
    queryKey: [`ttc-route-${line}`],
    queryFn: async () => {
      const response = await fetch(
        `https://webservices.umoiq.com/service/publicJSONFeed?command=routeConfig&a=ttc&r=${line}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
    staleTime: 24 * 60 * 60 * 1000,
    refetchInterval: 60 * 1000,
    placeholderData: (prev) => prev,
  });

/** @deprecated no replacement :( */
export const ttcVehicleLocation = (vehicle: number) =>
  queryOptions<parsedVehicleLocation>({
    queryKey: [`ttc-vehicle-location-${vehicle}`],
    queryFn: async () => {
      const response = await fetch(
        `https://webservices.umoiq.com/service/publicJSONFeed?command=vehicleLocation&a=ttc&v=${vehicle}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
    refetchInterval: 60 * 1000,
    placeholderData: (prev) => prev,
  });

// inaccessible; CORS Missing Allow Origin
export const ttcBusTimeVehiclesLocation = (vehicle: number) =>
  queryOptions({
    queryKey: [`ttc-bustime-vehicle-location-${vehicle}`],
    queryFn: async () => {
      const response = await fetch(
        "https://bustime.ttc.ca/bustime/api/v3/getvehicles?requestType=getvehicles&rt=95&key=?????&format=json&xtime=1763846697196"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
    refetchInterval: 60 * 1000,
    placeholderData: (prev) => prev,
  });

// using @atprotp/api methods instead
// export const ttcAlerts = queryOptions<{
//   feed: { post: { record: { text: string; createdAt: string } } }[];
// }>({
//   queryKey: ["bsky"],
//   queryFn: async () => {
//     const response = await fetch(
//       "https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=ttcalerts.bsky.social"
//     );
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     return response.json();
//   },
//   staleTime: 60 * 1000,
//   refetchInterval: 60 * 1000,
// });

// inaccessible; CORS Missing Allow Origin
// export const ttcGtfsAlerts = queryOptions({
//   queryKey: ["ttc-gtfs-alerts"],
//   queryFn: async () => {
//     const response = await fetch(
//       "https://gtfsrt.ttc.ca/alerts/all?format=binary",
//     );
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const buffer = await response.arrayBuffer();
//     const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
//       new Uint8Array(buffer),
//     );
//     return feed;
//   },
//   staleTime: 60 * 1000,
//   refetchInterval: 60 * 1000,
// });

// export const ttcGtfsTripUpdate = queryOptions({
//   queryKey: ["ttc-gtfs-trip-update"],
//   queryFn: async () => {
//     const response = await fetch("https://bustime.ttc.ca/gtfsrt/trips");
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const buffer = await response.arrayBuffer();
//     const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
//       new Uint8Array(buffer)
//     );
//     return feed;
//   },
//   staleTime: 60 * 1000,
//   refetchInterval: 60 * 1000,
// });

export const ttcSubwayPredictions = (stopNum: number) =>
  queryOptions<SubwayStop[]>({
    queryKey: [`ttc-subway-predictions-${stopNum}`],
    queryFn: async () => {
      const response = await fetch(
        `https://ntas.ttc.ca/api/ntas/get-next-train-time/${stopNum}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
    refetchInterval: 60 * 1000,
    placeholderData: (prev) => prev,
  });

export const ttcRouteBasic = (lineNum: number) =>
  queryOptions<SubwayStations>({
    queryKey: [`ttc-subway-line-${lineNum}`],
    queryFn: async () => {
      try {
        const response = await fetch(
          `https://www.ttc.ca/ttcapi/routedetail/get?id=${lineNum}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      } catch (_error) {
        return { routeBranchesWithStops: [], Error: true };
      }
    },
    staleTime: 24 * 60 * 60 * 1000,
    refetchInterval: 60 * 1000,
    placeholderData: (prev) => prev,
  });

/**
 * currently not used due to bad handling of bad stop ids
 *  @deprecated no replacement :( */
export const ttcMultiStopsPredictions = (fetchUrl: string) =>
  queryOptions<EtaPredictionJson>({
    queryKey: [`ttc-multi-stops-predictions-${fetchUrl}`],
    queryFn: async () => {
      const response = await fetch(
        `https://webservices.umoiq.com/service/publicJSONFeed?command=predictionsForMultiStops&a=ttc${fetchUrl}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
    refetchInterval: 60 * 1000,
    placeholderData: (prev) => prev,
  });

const agent = new Agent("https://api.bsky.app");

export const atprotoTtcAlerts = queryOptions({
  queryKey: ["atproto-ttc-alerts"],
  queryFn: async () => {
    const response = await agent.getAuthorFeed({
      actor: "did:plc:jp63azhhbjm7hzse6bx6oq43",
      limit: 100,
    });
    if (!response.success) {
      throw new Error("Network response was not ok");
    }

    return response?.data?.feed;
  },
});

export const getYrtStops = queryOptions<
  { stopId: string; stopPublicId: string }[]
>({
  queryKey: ["yrt-stops"],
  queryFn: async () => {
    const response = await fetch(
      "https://thomassth.github.io/to-bus-stations/data/yrt/stops.json"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  },
  staleTime: 24 * 60 * 60 * 1000,
});

// ============================================
// GTA Unified Queries
// ============================================

/**
 * Cloudflare Worker URL for GTA transit proxy
 * TODO: Update this to your deployed worker URL
 */
const GTA_PROXY_URL =
  import.meta.env.VITE_GTA_PROXY_URL ||
  "https://tobus.kiranprasad2001.workers.dev";

/**
 * GO Transit arrivals query
 */
export const goTransitArrivals = (stopCode: string) =>
  queryOptions<ArrivalPrediction[]>({
    queryKey: [`go-transit-arrivals-${stopCode}`],
    queryFn: async () => {
      const response = await fetch(
        `${GTA_PROXY_URL}?agency=go&stopCode=${encodeURIComponent(stopCode)}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return normalizeGoTransit(data);
    },
    refetchInterval: 60 * 1000,
    placeholderData: (prev) => prev,
  });

/**
 * Unified GTA arrivals query options based on agency
 */
export const gtaArrivalsQuery = (stop: UnifiedStop) => {
  switch (stop.agency) {
    case "go":
      return goTransitArrivals(stop.code);
    default:
      // For TTC, use the existing stop prediction but normalize to ArrivalPrediction
      return queryOptions<ArrivalPrediction[]>({
        queryKey: [`gta-ttc-arrivals-${stop.id}`],
        queryFn: async () => {
          const response = await fetch(
            `https://webservices.umoiq.com/service/publicJSONFeed?command=predictions&a=ttc&stopId=${stop.code}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          return normalizeTtc(data);
        },
        refetchInterval: 60 * 1000,
        placeholderData: (prev) => prev,
      });
  }
};

/**
 * Hook to get unified arrivals for any GTA stop
 */
export function useGtaArrivals(stop: UnifiedStop | null) {
  return useQuery({
    ...gtaArrivalsQuery(
      stop ?? { id: "", code: "", agency: "ttc", name: "", lat: 0, lon: 0 }
    ),
    enabled: !!stop,
  });
}

// ============================================
// Live Map Queries
// ============================================

export interface VehiclePosition {
  id: string;
  routeTag: string;
  lat: number;
  lon: number;
  heading: number;
  speedKmHr: number;
  secsSinceReport: number;
}

export interface RoutePathPoint {
  lat: number;
  lon: number;
}

export interface RouteWithPaths {
  tag: string;
  title: string;
  color: string;
  stops: Array<{ tag: string; title: string; lat: number; lon: number }>;
  paths: RoutePathPoint[][];
}

/**
 * Fetch ALL TTC vehicle positions from UmoIQ XML feed.
 * Returns ~1,000 vehicles with lat/lng, heading, speed, route.
 * Auto-refreshes every 15 seconds.
 */
export const ttcAllVehiclePositions = queryOptions<VehiclePosition[]>({
  queryKey: ["ttc-all-vehicles"],
  queryFn: async () => {
    const response = await fetch(
      "https://retro.umoiq.com/service/publicXMLFeed?command=vehicleLocations&a=ttc&t=0"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const text = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "text/xml");
    const vehicleElements = xml.querySelectorAll("vehicle");
    const vehicles: VehiclePosition[] = [];

    for (const el of vehicleElements) {
      const id = el.getAttribute("id");
      const routeTag = el.getAttribute("routeTag");
      const lat = el.getAttribute("lat");
      const lon = el.getAttribute("lon");
      const heading = el.getAttribute("heading");
      const speedKmHr = el.getAttribute("speedKmHr");
      const secsSinceReport = el.getAttribute("secsSinceReport");

      if (id && routeTag && lat && lon) {
        vehicles.push({
          id,
          routeTag,
          lat: Number.parseFloat(lat),
          lon: Number.parseFloat(lon),
          heading: Number.parseInt(heading || "0", 10),
          speedKmHr: Number.parseFloat(speedKmHr || "0"),
          secsSinceReport: Number.parseInt(secsSinceReport || "0", 10),
        });
      }
    }

    return vehicles;
  },
  refetchInterval: 15 * 1000,
  staleTime: 10 * 1000,
});

/**
 * Fetch route config including path polyline data for drawing route overlays.
 */
export const ttcRouteWithPaths = (routeTag: string) =>
  queryOptions<RouteWithPaths>({
    queryKey: [`ttc-route-paths-${routeTag}`],
    queryFn: async () => {
      const response = await fetch(
        `https://retro.umoiq.com/service/publicXMLFeed?command=routeConfig&a=ttc&r=${routeTag}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const text = await response.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, "text/xml");
      const routeEl = xml.querySelector("route");

      const tag = routeEl?.getAttribute("tag") || routeTag;
      const title = routeEl?.getAttribute("title") || routeTag;
      const color = routeEl?.getAttribute("color") || "666666";

      // Parse stops
      const stopEls = routeEl?.querySelectorAll("stop[lat]") || [];
      const stopsMap = new Map<
        string,
        { tag: string; title: string; lat: number; lon: number }
      >();
      for (const s of stopEls) {
        const sTag = s.getAttribute("tag") || "";
        if (!stopsMap.has(sTag)) {
          stopsMap.set(sTag, {
            tag: sTag,
            title: s.getAttribute("title") || "",
            lat: Number.parseFloat(s.getAttribute("lat") || "0"),
            lon: Number.parseFloat(s.getAttribute("lon") || "0"),
          });
        }
      }

      // Parse paths
      const pathEls = xml.querySelectorAll("path");
      const paths: RoutePathPoint[][] = [];
      for (const p of pathEls) {
        const points: RoutePathPoint[] = [];
        const pointEls = p.querySelectorAll("point");
        for (const pt of pointEls) {
          points.push({
            lat: Number.parseFloat(pt.getAttribute("lat") || "0"),
            lon: Number.parseFloat(pt.getAttribute("lon") || "0"),
          });
        }
        if (points.length > 0) {
          paths.push(points);
        }
      }

      return {
        tag,
        title,
        color: `#${color}`,
        stops: Array.from(stopsMap.values()),
        paths,
      };
    },
    staleTime: 24 * 60 * 60 * 1000,
  });

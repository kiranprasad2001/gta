import GtfsRealtimeBindings from "gtfs-realtime-bindings";

async function run() {
  try {
    const response = await fetch(
      "https://gtfsrt.ttc.ca/trips/update?format=binary"
    );
    const buffer = await response.arrayBuffer();
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
      new Uint8Array(buffer)
    );

    let subwayCount = 0;
    const lines = new Set();

    feed.entity.forEach((entity) => {
      if (entity.tripUpdate?.trip?.routeId) {
        const rId = entity.tripUpdate.trip.routeId;
        lines.add(rId);
        if (["1", "2", "4", "5", "6"].includes(rId)) {
          if (subwayCount < 3) {
            console.log("Found subway trip update!");
            console.log(JSON.stringify(entity.tripUpdate, null, 2));
          }
          subwayCount++;
        }
      }
    });

    console.log("Total subway trip updates found:", subwayCount);
    const subways = [1, 2, 4, 5, 6].map(String);
    const foundSubways = subways.filter((s) => lines.has(s));
    console.log("Subways/LRTs found in TripUpdates:", foundSubways.join(", "));
  } catch (error) {
    console.log("Error:", error);
  }
}
run();

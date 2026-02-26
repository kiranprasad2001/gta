import GtfsRealtimeBindings from 'gtfs-realtime-bindings';

async function run() {
  try {
    const response = await fetch("https://bustime.ttc.ca/gtfsrt/vehiclepositions");
    console.log("Status:", response.status);
    const buffer = await response.arrayBuffer();
    console.log("Buffer size:", buffer.byteLength);
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(new Uint8Array(buffer));
    console.log("Entities:", feed.entity.length);
    
    const lines = new Set();
    feed.entity.forEach((entity) => {
      if (entity.vehicle && entity.vehicle.trip && entity.vehicle.trip.routeId) {
        lines.add(entity.vehicle.trip.routeId);
      }
    });
    
    console.log("Found route IDs:", Array.from(lines).sort().join(", "));
  } catch (error) {
    console.log("Error:", error);
  }
}
run();

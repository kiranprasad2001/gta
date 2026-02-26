const https = require("node:https");
const fs = require("node:fs");

const query = `
[out:json];
area["name"="Toronto"]->.searchArea;
(
  node["railway"="station"]["station"="light_rail"](area.searchArea);
  node["railway"="station"]["station"="subway"](area.searchArea);
  node["railway"~"halt|stop"]["station"="light_rail"](area.searchArea);
  node["public_transport"="stop_position"]["light_rail"="yes"](area.searchArea);
);
out body;
`;

const options = {
  hostname: "overpass-api.de",
  path: "/api/interpreter",
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

const req = https.request(options, (res) => {
  let data = "";
  res.on("data", (chunk) => {
    data += chunk;
  });
  res.on("end", () => {
    try {
      if (data.includes("rate_limited")) {
        console.error("Rate limited by Overpass API");
        process.exit(1);
      }
      const result = JSON.parse(data);
      const stations = result.elements
        .filter((e) => e.tags?.name)
        .map((e) => ({ name: e.tags.name, lat: e.lat, lon: e.lon }));
      fs.writeFileSync("lrt_stations.json", JSON.stringify(stations, null, 2));
      console.log(`Wrote ${stations.length} stations to lrt_stations.json`);
    } catch (e) {
      console.error(e);
      console.error(data);
    }
  });
});

req.write(`data=${encodeURIComponent(query)}`);
req.end();

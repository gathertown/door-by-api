const {
  ROOM_ID,
  MAP_ID,
  API_KEY,
  DOOR_IMAGES,
  DOOR_POS,
  PASSWORD,
  DOOR_URL,
} = require("./config");

const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.static("dist"));
app.get("/api/submitPassword", (req, res) => {
  console.log("someone hit the api");
  if (req.query.password !== PASSWORD) {
    res.send({ status: "Incorrect password" });
    return;
  }

  let oldMapData = null;

  axios
    .get("https://gather.town/api/getMap", {
      params: {
        apiKey: API_KEY,
        spaceId: ROOM_ID,
        mapId: MAP_ID,
      },
    })
    .then((result) => {
      let mapData = result.data;
      oldMapData = JSON.parse(JSON.stringify(mapData));

      // Find the door object and change its image and store the old object
      let found = false;
      for (let idx = 0; idx < mapData.objects.length; idx++) {
        let object = mapData.objects[idx];
        if (object.x === DOOR_POS.x && object.y === DOOR_POS.y) {
          found = true;
          mapData.objects[idx].normal = DOOR_IMAGES.open;
          mapData.objects[idx].highlighted =
            DOOR_IMAGES.open_highlight || DOOR_IMAGES.open;
          oldMapData.objects[idx].normal = DOOR_IMAGES.closed;
          oldMapData.objects[idx].highlighted =
            DOOR_IMAGES.closed_highlight || DOOR_IMAGES.closed;
        }
      }
      if (!found) {
        const doorTemplate = {
          type: 1,
          x: DOOR_POS.x,
          y: DOOR_POS.y,
          properties: {
            url: DOOR_URL,
          },
          width: DOOR_IMAGES.width,
          height: DOOR_IMAGES.height,
        };
        mapData.objects.push(
          Object.assign(doorTemplate, {
            normal: DOOR_IMAGES.open,
            highlighted: DOOR_IMAGES.open_highlight || DOOR_IMAGES.open,
          })
        );
        oldMapData.objects.push(
          Object.assign(doorTemplate, {
            normal: DOOR_IMAGES.closed,
            highlighted: DOOR_IMAGES.closed_highlight || DOOR_IMAGES.closed,
          })
        );
        console.log("no door found, added a new one");
      }

      // Get rid of the impassable tile
      let buf = Uint8Array.from(Buffer.from(mapData.collisions, "base64"));
      for (let dx = 0; dx < DOOR_IMAGES.width; dx += 1) {
        for (let dy = 0; dy < DOOR_IMAGES.height; dy += 1) {
          buf[
            (DOOR_POS.y + dy) * mapData.dimensions[0] + DOOR_POS.x + dx
          ] = 0x00;
        }
      }
      mapData.collisions = new Buffer(buf).toString("base64");

      let oldBuf = Uint8Array.from(
        Buffer.from(oldMapData.collisions, "base64")
      );
      for (let dx = 0; dx < DOOR_IMAGES.width; dx += 1) {
        for (let dy = 0; dy < DOOR_IMAGES.height; dy += 1) {
          oldBuf[
            (DOOR_POS.y + dy) * oldMapData.dimensions[0] + DOOR_POS.x + dx
          ] = 0x01;
        }
      }
      oldMapData.collisions = new Buffer(oldBuf).toString("base64");

      return axios.post("https://gather.town/api/setMap", {
        apiKey: API_KEY,
        spaceId: ROOM_ID,
        mapId: MAP_ID,
        mapContent: mapData,
      });
    })
    .then((result) => {
      res.send({ status: "Opened!" });

      setTimeout(() => {
        axios.post("https://gather.town/api/setMap", {
          apiKey: API_KEY,
          spaceId: ROOM_ID,
          mapId: MAP_ID,
          mapContent: oldMapData,
        });
      }, 5000);
    })
    .catch((err) => {
      console.log(err);
      res.send({ status: "An error occurred " + err.toString() });
    });
});

app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);

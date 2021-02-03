# gather-doors

Instantiated by the always handy [simple-react-full-stack](https://github.com/crsandeep/simple-react-full-stack)

The code for the door in the [Gather office](https://staging.gather.town/app/oxrhEtb3sV7VutbQ/GatherOffice)

A good example of editing the map using the API

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Documentation

needs `config.js` in the server directory with the following:

```js
module.exports = {
  ROOM_ID: "YourSpaceId12345\\Space Name",
  MAP_ID: "custom_entrance",
  API_KEY: "[your api key]",
  DOOR_IMAGES: {
    "open": "image url here",
    "closed": "image url here"
    "width": // width in Gather tiles (pixels / 32) of the door images
    "height": // height in Gather tiles (pixels / 32) of the door images
  },
  DOOR_POS: {
    "x": [x coor],
    "y": [y coor]
  },
  PASSWORD: "[password to door]",
  DOOR_URL: "url to wherever you're hosting the server", // note: http://localhost:3000 will NOT work, because only https is allowed in iFrames on https domains :P
}
```

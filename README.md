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
    "open": "[image url]",
  },
  DOOR_POS: {
    "x": [x coor],
    "y": [y coor]
  },
  PASSWORD: "[password to door]",
}
```

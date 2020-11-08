# gather-doors

Instantiated by the always handy [simple-react-full-stack](https://github.com/crsandeep/simple-react-full-stack)

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

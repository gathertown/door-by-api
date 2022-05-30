# ! UPDATE !

We now have much better ways of doing this!
Add a built-in password door like [this](https://support.gather.town/help/doors#:~:text=Choose%20Doors%20or%20Password%20Doors,or%20edit%20the%20door's%20password).
Or use our [newer, better API](https://gathertown.notion.site/Gather-Websocket-API-bf2d5d4526db412590c3579c36141063) yourself.

Leaving the rest of this README in place because it's still an example of how to cleverly use the http API and iFrames.

.

.

.

.


# gather-doors

A basic example of dynamically editing the map using the API

Instantiated by the always handy [simple-react-full-stack](https://github.com/crsandeep/simple-react-full-stack)

The code for the door in the [Gather office](https://staging.gather.town/app/oxrhEtb3sV7VutbQ/GatherOffice)

Warning: this code is not officially supported and you will likely have to modify it to suit your needs!
Better, more powerful objects, like doors, are a work in progress and it will be easier soonish :)

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

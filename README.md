# millburnhacks

This is the source code for Millburn Hacks' website.

Before using the website, make sure to install all required packages with

```bash
npm install
```

To run the server for development, run the following command to have Gulp watch for changes in
SCSS files, Webpack watch for changes in `app/`, and Firebase run the server on `localhost:5000`
all at once.

```bash
npm run dev
```

To deploy the current code, run `firebase deploy`.

The app folder has the client code, which handles most of the app's functionality. The styles
folder has the stylesheets.

## Data structure

A club follows the following structure:

```js
{
  name: "Category Theory Club",
  meetings: {
    // time: location
    "Monday": "room 110",
    "Tuesday": "room 109"
  },
  slogan: "Learn about abstract nonsense",
  officers: {
    // name: title
    // title and name can be any string
    "John Doe": "President",
    "Mark O'Hallie": "Vice President"
  },
  description: "Category theory is math without any actual stuff, just arrows and thingies",
}
```

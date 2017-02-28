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

To lint (i.e. check for code errors and warnings), run `npm run lint`. Note that you cannot commit
any changes if they fail the lint.

To deploy the current code, run `npm run deploy`.

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

An event has the following structure:

```js
{
  name: "Abhinav's Birthday",
  date: { yyyy: 1999, mm: 01, dd: 24 }, // 1999 January 24
  description: "Come for the fetus, stay for the baby",
  clubID: "eoihgi903u90fn" // optional
}
```

## Page structure

The App component marks all pages with the `page` class, allowing the Sass to select the pages.

A page is divided into `section`s, which fill the screen.

A banner is a section whose children are centered in both axes and has a slightly lighter colour.

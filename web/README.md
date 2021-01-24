# Getting Start

Install a React Web environment to start the application.

Make sure you are in the project's ``./web`` folder.

Also make sure you have installed NodeJs 14 and npm 6.

Now run:

```
$ npm install
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# Tree
```
├── public                              # public page
│   ├── favicon.ico
│   ├── images
│   ├── index.html
│   ├── manifest.json
│   └── _redirects
├── src                                 # Source project
│   ├── App.js                          # App service 
│   ├── components                      # Global components
│   │   ├── Alert
│   │   ├── Characters
│   │   ├── Films
│   │   ├── GenericMoreButton
│   │   ├── Header
│   │   ├── Homeworld
│   │   ├── Navigation
│   │   ├── Page
│   │   ├── People
│   │   ├── Pilots
│   │   ├── Planets
│   │   ├── Residents
│   │   ├── ScrollReset
│   │   ├── Species
│   │   ├── Starships
│   │   ├── StatusBullet
│   │   ├── Summary
│   │   └── Vehicles
│   ├── layouts                         # Global layouts
│   │   ├── Dashboard
│   │   │   ├── components
│   │   │       ├── NavBar
│   │   │       └── TopBar
│   │   └── Error
│   ├── routes.js                       # Routes app
│   ├── theme                           # Themes layout
│   │   ├── overrides
│   │   ├── palette.js
│   │   └── typography.js
│   ├── utils                           # Required packages and settings
│   │   ├── axios.js
│   │   ├── bytesToSize.js
│   │   ├── getInitials.js
│   │   ├── gradients.js
│   │   └── useRouter.js
│   └── views                           # Views to the layouts
│       ├── CharactersList
│       ├── Error401
│       ├── Error404
│       ├── Error500
│       ├── Film
│       ├── Person
│       ├── Planet
│       ├── Presentation
│       ├── Specie
│       ├── Starship
│       ├── StarshipsList
│       └── Vehicle
```
# React Single Page Application with Tailwind and Firebase

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

### `firebase init

Initializes Firebase setup 

###   `firebase deploy`

Deploys the current build from the build folder for hosting


# App Architecture
```
.
│   App.css
│   App.js
│   index.css
│   index.js
│
├───components
│   ├───404
│   │       404.css
│   │       404.js
│   │
│   ├───create
│   │       Create.css
│   │       Create.js
│   │
│   ├───edit
│   │       Edit.css
│   │       Edit.js
│   │
│   ├───footer
│   │       Footer.css
│   │       Footer.js
│   │
│   ├───header
│   │       Header.css
│   │       Header.js
│   │
│   ├───HOC
│   │       RouteGuard.js
│   │
│   ├───home
│   │   │   Home.css
│   │   │   Home.js
│   │   │
│   │   └───authors
│   │           Author.js
│   │           TopAuthors.js
│   │
│   ├───loading
│       userService.js
│
└───utils
        backup.js
        firebase.js
```

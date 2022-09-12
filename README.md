# CRUD Template - Web Frontend - Redux Toolkit

This repository is the default frontend starter for new DALI React projects. Installation and setup instructions are included below. You should eventually customize this README file with project-specific documentation.

## Tech Stack
- [React v18](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [axios](https://github.com/axios/axios)
- [React Router v6](https://reactrouter.com/en/main)

## Directory Structure
    .
    ├── ...    
    ├── public
    ├── src                
    │   └── assets             # static assets   
    │   └── components         # reusable components across several screens
    │   └── hooks              # useAppDispatch, useAppSelector
    │   └── redux              # Redux store and setup
    │   └── screens            # individual pages
    │   └── utils              # utility folder containing helper files
    ├── tsconfig.json          # TypeScript configuration
    ├── package.json           # npm config
    └── ...

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs project dependencies.

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

### `npm run lint`

ESLint is set up in this project. To keep code clean, always remember to run `yarn run lint` and fix any lint problems before merging into master.

## Authors & Credits
- Eric Lu '25

Additional credit goes to Adam McQuilkin '22,  Thomas Monfre '21, Tyler Vergho '23 for developing the original DALI [CRUD Template Frontend](https://github.com/dali-lab/crud-template-frontend), which this starter pack was evolved from.

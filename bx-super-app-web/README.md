# Getting Started with Bx React Skeleton

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Install Dependencies

```bash
npm i --legacy-peer-deps
```

## Available Scripts

In the project directory, you can run:

### `yarn start`
en package.json escoger el puerto de despliegue en start: react-scripts cambiar por:

 "scripts": {
    "start" : "set PORT=3001 && react-scripts start"
    
npm run start

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## `yarn lint`

Launch linter check.

## `yarn lint:fix`

Launch linter fix.

## `yarn format`

Launch prettier format check.

## `yarn format:fix`

Launch prettier format fix.

## add source salesforce in code

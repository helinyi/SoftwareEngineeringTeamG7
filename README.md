<<<<<<< HEAD
# DealScout - Price Comparison Platform

Google cloud run URL: https://dealscout-979610128684.us-east4.run.app

~~Azure App Service URL: https://dealscout-dbhsg2gpdmf4bfaa.eastus-01.azurewebsites.net~~

Using sqlite3 for development for now (allowed in gitignore and dockerignore).

## Django Admin user (in sqlite3)

- username: dealscout
- password: jhdnPv3KO3ppMeATXW7N

---

# HOWTOs

## How to run locally for development (both django backend and react frontend)

1. `pip install -r requirements.txt` to install dependencies
2. `./deal-frontend-build.sh` to build the frontend
3. `python manage.py collectstatic --noinput` to collect static files
4. `python manage.py runserver` to run the server

## How to run locally to test production build (django backend and react frontend)

1. `pip install -r requirements.txt` to install dependencies
2. `./deal-frontend-build.sh` to build the frontend
3. `python manage.py collectstatic --noinput` to collect static files
4. `gunicorn --bind 0.0.0.0:8000 dealscout.wsgi:application --workers 3` to run the server

## How to build docker locally

1. `docker build -t dealscout .` to build the docker image
2. `docker run -p 8000:8000 dealscout` to run the docker container
3. access the app at http://localhost:8000

## How to deploy to Google Cloud Run and Azure App Service

1. Just push to the main branch and the CI/CD pipelines will deploy to Google Cloud Run and Azure App Service automatically.


=======
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
>>>>>>> a980f1a (Initialize project using Create React App)

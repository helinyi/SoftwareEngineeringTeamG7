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



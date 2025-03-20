# DealScout - Price Comparison Platform

Google cloud run URL: https://dealscout-979610128684.us-east4.run.app

~~Azure App Service URL: https://dealscout-dbhsg2gpdmf4bfaa.eastus-01.azurewebsites.net~~

Using sqlite3 for development for now (allowed in gitignore and dockerignore).

## Django Admin user (in sqlite3)

- username: dealscout
- password: jhdnPv3KO3ppMeATXW7N

---

Here's a section of the `README.md` to guide users on how to navigate to the different branches of the repository and download the pages:

---

## Frontend React Project - Navigation and Setup

This project is a frontend React application featuring multiple pages and components for Deals Scout. The following pages are implemented in different branches. To view or contribute to any specific page, you can follow the instructions below to navigate to the relevant branch.

### 1. Product Search Page
This page includes an interactive grid layout with filtering and sorting options for product search.

**Branch**: `NishanthDev`

#### How to Access:
1. Clone or navigate to the repository:
   ```bash
   git clone https://github.com/helinyi/SoftwareEngineeringTeamG7.git
   cd SoftwareEngineeringTeamG7
   ```
2. Checkout the branch `NishanthDev`:
   ```bash
   git checkout NishanthDev
   ```
3. Install dependencies and run the project:
   ```bash
   npm install
   npm start
   ```

---

### 2. Product Details Page
This page displays comprehensive product information, including specifications, pricing, and customer reviews.

**Branch**: `NishanthDev`

#### How to Access:
1. Clone or navigate to the repository:
   ```bash
   git clone https://github.com/helinyi/SoftwareEngineeringTeamG7.git
   cd SoftwareEngineeringTeamG7
   ```
2. Checkout the branch `NishanthDev`:
   ```bash
   git checkout NishanthDev
   ```
3. Install dependencies and run the project:
   ```bash
   npm install
   npm start
   ```

---

### 3. Product Comparison Page
This page allows users to compare products side by side, highlighting their features.

**Branch**: `NishanthDev`

#### How to Access:
1. Clone or navigate to the repository:
   ```bash
   git clone https://github.com/helinyi/SoftwareEngineeringTeamG7.git
   cd SoftwareEngineeringTeamG7
   ```
2. Checkout the branch `NishanthDev`:
   ```bash
   git checkout NishanthDev
   ```
3. Install dependencies and run the project:
   ```bash
   npm install
   npm start
   ```

---

### 4. Landing Page
This page is the main entry point of the application with navigation to all other sections.

**Branch**: `AvadhootDev`

#### How to Access:
1. Clone or navigate to the repository:
   ```bash
   git clone https://github.com/helinyi/SoftwareEngineeringTeamG7.git
   cd SoftwareEngineeringTeamG7
   ```
2. Checkout the branch `AvadhootDev`:
   ```bash
   git checkout AvadhootDev
   ```
3. Install dependencies and run the project:
   ```bash
   npm install
   npm start
   ```

---

### 5. Sign In Page
This page allows users to sign into their account.

**Branch**: `AvadhootDev`

#### How to Access:
1. Clone or navigate to the repository:
   ```bash
   git clone https://github.com/helinyi/SoftwareEngineeringTeamG7.git
   cd SoftwareEngineeringTeamG7
   ```
2. Checkout the branch `AvadhootDev`:
   ```bash
   git checkout AvadhootDev
   ```
3. Install dependencies and run the project:
   ```bash
   npm install
   npm start
   ```

---

### 6. Sign Up Page
This page allows users to create a new account.

**Branch**: `AvadhootDev`

#### How to Access:
1. Clone or navigate to the repository:
   ```bash
   git clone https://github.com/helinyi/SoftwareEngineeringTeamG7.git
   cd SoftwareEngineeringTeamG7
   ```
2. Checkout the branch `AvadhootDev`:
   ```bash
   git checkout AvadhootDev
   ```
3. Install dependencies and run the project:
   ```bash
   npm install
   npm start
   ```

---

### 7. Price Alert Page
This page allows users to set up price alerts for products they are interested in.

**Branch**: `ShreeramUser`

#### How to Access:
1. Clone or navigate to the repository:
   ```bash
   git clone https://github.com/helinyi/SoftwareEngineeringTeamG7.git
   cd SoftwareEngineeringTeamG7
   ```
2. Checkout the branch `ShreeramUser`:
   ```bash
   git checkout ShreeramUser
   ```
3. Install dependencies and run the project:
   ```bash
   npm install
   npm start
   ```

---

### 8. User Profile Page
This page displays the user profile, where users can update their details and preferences.

**Branch**: `ShreeramUser`

#### How to Access:
1. Clone or navigate to the repository:
   ```bash
   git clone https://github.com/helinyi/SoftwareEngineeringTeamG7.git
   cd SoftwareEngineeringTeamG7
   ```
2. Checkout the branch `ShreeramUser`:
   ```bash
   git checkout ShreeramUser
   ```
3. Install dependencies and run the project:
   ```bash
   npm install
   npm start
   ```

---

### General Instructions to Run the Project
1. Clone the repository:
   ```bash
   git clone https://github.com/helinyi/SoftwareEngineeringTeamG7.git
   cd SoftwareEngineeringTeamG7
   ```

2. Install all dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```


---

Let me know if you need further changes or additions!

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



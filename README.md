# Cypress-vs-Playwright

This project is implementation of testing [Tricentis](https://demowebshop.tricentis.com/) web application using Cypress and Playwright Framework. 

**Prerequisites**
1. `git clone https://github.com/robinch93/Cypress-vs-Playwright.git`
2. Download &nbsp; [NodeJS](https://nodejs.org/en/download/)
3. Download &nbsp; [Docker](https://www.docker.com/)
4. Run &nbsp; `docker-compose up -d`

**Tricentis REST API** <br /> [Tricentis](https://demowebshop.tricentis.com/) web application data is exposed via rest api endpoints created using [express](https://expressjs.com/) framework which works as a microservice to be consumed by the e2e api test cases. Follow steps to use API service:
<br />
1. Run &nbsp; `docker-compose up -d api` 
2. Refer [API documentation](https://documenter.getpostman.com/view/7423934/2s7Z16iMat) to make requests after importing [Postman](https://github.com/robinch93/Cypress-vs-Playwright/blob/master/api/collections/tricentis-api.postman_collection.json) or [Insomnia](https://github.com/robinch93/Cypress-vs-Playwright/blob/master/api/collections/tricentis-api.insomnia_collection.json) collections.
3. Example Curl Request for topmenu endpoint: <br />
   `curl --location --request GET 'http://localhost:3000/topmenu'`

**Tricentis Mongo Database** <br /> [Tricentis](https://demowebshop.tricentis.com/) web application data is saved in a MongoDB by sending request to api endpoints. Follow steps to use database service:
<br />
1. Run &nbsp; `docker-compose up -d mongodb mongo-express api` 
2. Populate the database by running&nbsp; `npm run db:populate`
3. Access MongoDB admin tool at: &nbsp; `http://localhost:8081/db/tricentis-mongo-db`

**Run tests on Local**
1. Run `npm install`
2. Run `PLAYWRIGHT_BROWSERS_PATH=$PWD/browsers npx playwright install`
3. Open and Run Tests using: <br />
   Chromium: &nbsp;  `npm run cy:open:chromium` <br />
   Firefox: &nbsp;  `npm run cy:open:firefox` <br />


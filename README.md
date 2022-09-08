# Cypress-vs-Playwright

This project is implementation of testing [Tricentis](https://demowebshop.tricentis.com/) web application using Cypress and Playwright Framework. 

**Prerequisites**
1. `git clone https://github.com/robinch93/Cypress-vs-Playwright.git`
2. Download [NodeJS](https://nodejs.org/en/download/)
3. Download [Docker](https://www.docker.com/)

**Tricentis REST API** <br /> [Tricentis](https://demowebshop.tricentis.com/) web application data is exposed via rest api endpoints created using [express](https://expressjs.com/) framework which works as a microservice to be consumed by the e2e api test cases. Follow steps to use API service:
<br />
1. Run `npm install && npm run api:server` or `docker-compose up -d api` 
2. Import [Postman](https://github.com/robinch93/Cypress-vs-Playwright/blob/master/api/collections/tricentis-api.postman_collection.json) or [Insomnia](https://github.com/robinch93/Cypress-vs-Playwright/blob/master/api/collections/tricentis-api.insomnia_collection.json) collections to make api requests 
3. Example Curl Request for topmenu endpoint: <br />
   `curl --location --request GET 'http://localhost:3000/topmenu'`

**Run tests on Local**
1. Download [NodeJS](https://nodejs.org/en/download/)
2. Run `npm install`
3. Run `PLAYWRIGHT_BROWSERS_PATH=$PWD/browsers npx playwright install`
4. Open and Run Tests using: <br />
   Chromium: &nbsp;  `npm run cy:open:chromium` <br />
   Firefox: &nbsp;  `npm run cy:open:firefox` <br />


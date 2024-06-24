Welcome to the documentation for the Worko API. This API provides endpoints to manage user details.

BaseURL

```
http://localhost:3000/api/worko/user
```

## Authentication

All endpoints except createUser require authentication. The authentication Token can be found when new user created in the response.

## File

File is included in the folder use it for populating the mongodb server.

## API Endpoints

--GET /api/worko/user

--GET /api/worko/user/:userId

--POST /api/worko/user

--PUT /api/worko/user/:userId

--PATCH /api/worko/user/:userId

--DELETE /api/worko/user/:userId

## Install Dependencies

--npm install

--npm install --save-dev supertest chai esm mocha mochawesome

## Run Command

npm run

## Test Command

npm test

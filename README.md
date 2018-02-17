## CS304 Group Project
A social network for artists.
- **Authors**: Patrick, Malinda, Andrew, Cham
- **Stack**: [PostgreSQL](https://github.com/brianc/node-postgres), [Node.js](https://nodejs.org/), [Express](https://expressjs.com/), [React](https://github.com/facebook/react) with [Jest](https://github.com/facebook/jest) for testing

## Installation
1. Clone the repo.
2. `yarn install` to install server (Express app) dependencies.
3. `cd client && yarn install` to instead client (React app) dependencies.

## Running Server & Client
1. `yarn start`in main directory to run the server on port 3000.
2. Open another console window and run `yarn start` in `/client/` directory to run client app on port 3001.
3. Client will be live at http://localhost:3001.

## Running Tests
Tests are written in Jest for both the client and server.
1. For info on writing tests with Jest, see [Client Documentation: Writing Tests](client#writing-tests).
2. Use `yarn test` in main directory to run server tests.
3. Use `yarn test` in client directory to run client tests.

## Reference
- [Client Documentation](client)
- [JavaScript Style Guide](https://github.com/airbnb/javascript)
- [React Style Guide](https://github.com/airbnb/javascript/tree/master/react)

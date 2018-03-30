## CS304 Group Project
A social network for artists.
- **Authors**: Patrick, Malinda, Andrew, Cham
- **Stack**: [PostgreSQL](https://github.com/brianc/node-postgres), [Node.js](https://nodejs.org/), [Express](https://expressjs.com/),  and [Handlebars](https://github.com/wycats/handlebars.js/)

Live at http://ec2-18-232-167-188.compute-1.amazonaws.com:3000

## Installation
0. Ensure you have Node v8.11.1 or greater installed, along with yarn (`npm install -g yarn`)
1. Clone the repo.
2. `yarn install` to install server (Express app) dependencies.
3. If you are a course TA, you must use the code submitted instead of cloning because it contains a secret config file. If you aren't a TA and cloned from the repo, you must create a config file containing passport secret and database connection URI in `/config/default.json` like so:
```
{
    "db":{
        "conString" : "postgres://<user>:<pass>@<url>:<port>/<db>"
    },
    "passport":{
        "secret": "<secret-word>"
    }
}
```

## Running Server & Client
1. `yarn start`in main directory to run the server on port 3000.
3. App will be live at http://localhost:3001.

## Populating the Database
Run `node setup.js`.

## Reference
- [Client Documentation](client)
- [JavaScript Style Guide](https://github.com/airbnb/javascript)
- [React Style Guide](https://github.com/airbnb/javascript/tree/master/react)

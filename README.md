# code-crusade frontend

Built with React.js and Typescript

## Prerequisites

### Environment variables

The following environment variables are required so the app functions properly.

It is recommended to put them inside a `.env.` file at the project root so react-scripts (from Create-react-app) automatically injects them at build time (note that they must start with the `REACT_APP` prefix to be injected).

|   Environment variable    | Usage                                                                                                       |   Type    | Default |      Example value      |
| :-----------------------: | ----------------------------------------------------------------------------------------------------------- | :-------: | :-----: | :---------------------: |
|    `REACT_APP_URL_API`    | The url of the API                                                                                          | `string`  |         | `http://localhost:8080` |
| `REACT_APP_USE_TEST_DATA` | True if you want to mock a server with test data False if you want the requests to go through to the server | `boolean` | `false` |         `true`          |

#### Example .env file

```
REACT_APP_URL_API=http://localhost:8080
REACT_APP_USE_TEST_DATA=true
```

## Run app

### With Docker

Build the container

```
docker build -t frontend .
```

The container exposes the port `3000`

```
docker run frontend
```

If everythings gone well, you should see a message like this one :

```
You can now view code-crusade in the browser.

  Local:            http://localhost:3000/
  On Your Network:  http://172.17.0.2:3000/

Note that the development build is not optimized.
To create a production build, use yarn build.
```

### Locally with Node.js installed

First, clone the application

```
$ git clone git@github.com:code-crusade/frontend.git
$ cd frontend
```

Then install dependencies by doing

```
$ npm install
```

Fire!

```
$ npm start
```

# code-crusade frontend

Built with React.js and Typescript

## Environment variables
The following environment variables are required so the app functions properly. 

It is recommended to put them inside a .env.local file at the project root so react-scripts (from Create-react-app) automatically injects them at build time (note that they must start with the `REACT_APP` prefix to be injected).

|   Environment variable  | Usage                                                                                                       |   Type  | Default |     Example value     |
|:-----------------------:|-------------------------------------------------------------------------------------------------------------|:-------:|:-------:|:---------------------:|
| `REACT_APP_URL_API`       | The url of the API                                                                                          | `string`  |         | `http://localhost:8080` |
| `REACT_APP_USE_TEST_DATA` | True if you want to mock a server with test data False if you want the requests to go through to the server | `boolean` | `false`   | `true`                  |

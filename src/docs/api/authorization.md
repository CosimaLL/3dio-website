# Authorization

In order to provide secure access to private and protected resources, such as 3D scenes and to be able to
determine your API usage in order to bill some of our services, such as the Virtual Staging service,
some of the API calls will require an API key or have the option to provide one if private resources should be accessed.

Getting the API key is free and quick and providing the API key in requests in unobtrusive.

## Getting your free API key

To generate an API key or see your previously-generated key, visit [your organisation page](https://spaces.archilogic.com/organization).

## Making authorized requests

To make authorized API calls, you provide the API key along with the HTTP request in the `X-API-KEY` header or configure your client library:

```bash
curl -X POST -H 'Content-Type: application/json' -H 'X-API-KEY: YOUR-API-KEY-HERE' -d '...' https://spaces.archilogic.com/api/v2
```
```javascript
var DIO = require('3d.io)
DIO.setApiKey('YOUR-API-KEY-HERE')
```

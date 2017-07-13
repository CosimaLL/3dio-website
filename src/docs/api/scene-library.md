# Scene library

The scene library gives you access to your 3D scenes as well as the public 3D scenes from [Archilogic](https://spaces.archilogic.com/explore).

## List scenes

API-Key: **optional**

Lists all available scenes.
If a valid API key is supplied, it lists all scenes of your organisation, otherwise it lists all public scenes.

| Parameter | Required? | Description |
| --- | --- | --- |
| `page` | No | Specifies which page of results should be returned. Defaults to the first page (`page = 0`) |

### Example

The following snippet will return the first 40 public scenes:

```bash
  curl -X POST -H 'content-type: application/json' -d '{ \
    "json-rpc": 2.0, \
    "id": "some-random-id", \
    "method": "Model.list", \
    "params": { \
      "filter": {} \
    } \
  }'
```
```javascript
  var DIO = require('3d.io')
  DIO.scenes.list().then(console.log)
```

## Get single scene

API-Key: **optional**

| Parameter | Required? | Description |
| --- | --- | --- |
| `resourceId` | No* | Specifies the global ID of the scene to be returned, which can be found in the `resourceId` field of a scene. |
| `resourceName` | No* | Has to be used in combination with `organizationResourceName`.<br>Specifies the name of the scene to be returned. |
| `organizationResourceName` | No* | Has to be used in combination with `resourceName`.<br>Name of the organisation who owns the scene.

***)** Either `resourceId` or both `resourceName` and `organizationResourceName` have to be specified.

### Example

Retrieves the public scene with the ID `abc123`

```bash
  curl -X POST -H 'content-type: application/json' -d '{ \
    "json-rpc": 2.0, \
    "id": "some-random-id", \
    "method": "Model.read", \
    "params": { \
      "arguments": { \
        "resourceId": "abc123" \
      } \
    } \
  }'
```
```javascript
  var DIO = require('3d.io')
  DIO.scenes.get({id: 'abc123' }).then(console.log)
```

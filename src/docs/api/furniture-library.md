# Furniture Library

The furniture library API calls give you access to the broad [furniture library](https://spaces.archilogic.com/products) offered by [Archilogic](https://spaces.archilogic.com/explore).

## Searching the library

API-Key: **Not required**

| Parameter | Required? | Description |
| --- | --- | --- |
| `searchQuery` | Yes | An object specifying search options (see below) or an empty object to return any furniture piece. |
| `limit` | Yes | How many results will be returned at most. |

The `searchQuery` object looks like this with all fields being optional:

| Field name | Description |
| --- | --- |
| `query` | A text that will be fuzzily matched against the name, description, tags and manufacturer of the product |
| `lengthMin` | Minimum length of the product in centimeters |
| `lengthMax` | Maximum length of the product in centimeters |
| `widthMin` | Minimum width of the product in centimeters |
| `widthMax` | Maximum width of the product in centimeters |
| `heightMin` | Minimum height of the product in centimeters |
| `heightMax` | Maximum height of the product in centimeters |

The following snippet lists the first 50 furniture pieces:

```bash
  curl -X POST -H 'content-type: application/json' -d '{ \
    "json-rpc": 2.0, \
    "id": "some-random-id", \
    "method": "Product.search", \
    "params": { \
      "searchQuery": {} \
      "limit": 50 \
    } \
  }'
```
```javascript
  var DIO = require('3d.io')
  DIO.furniture.search().then(console.log)
```

## Get a single furniture piece

API-Key: **Not required**

| Parameter | Required? | Description |
| --- | --- | --- |
| `productResourceId` | Yes | The ID of the product to retrieve. |

The following snippet reads a single product with the ID `abc123`:

```bash
  curl -X POST -H 'content-type: application/json' -d '{ \
    "json-rpc": 2.0, \
    "id": "some-random-id", \
    "method": "Product.read", \
    "params": { \
      "productResourceId": "abc123"
    } \
  }'
```
```javascript
  var DIO = require('3d.io')
  DIO.furniture.get('abc123').then(console.log)
```


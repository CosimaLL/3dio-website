# Lightmap baking

## What is lightmap baking?

Lightmap baking is an efficient way to precalculate static lights for a static scene.
The idea is to produce a grayscale image where a white pixel means "bright light here" and a black pixel means "no light here" instead of doing the heavier realtime lighting calculations.

![Baked lights add a lot to the realism of a 3D scene](https://archilogic-content-beta.s3.amazonaws.com/archilogic/landing/blog/blog_images/lm.jpg)

The process and outcome is described in detail [here](https://spaces.archilogic.com/blog/3d-models-light-baking).

You have two options available:

* A fast, low-resolution lightmap that gives you a great approximation on how the lighting situation could look like
* A slower, high-resolution lightmap that looks more realistic and polished

## Requesting a low-resolution lightmap

| Parameter | Required? | Description |
| --- | --- | --- |
| ? | ? | ? |

### Example

Request a low-resolution light map for a scene:
```javascript
  var DIO = require('3d.io')
  DIO.Bake.calculateLoRes({
    // ?
  }).then(console.log)
```

## Requesting a high-resolution lightmap

| Parameter | Required? | Description |
| --- | --- | --- |
| ? | ? | ? |

### Example

Request a high-resolution light map for a scene:
```javascript
  var DIO = require('3d.io')
  DIO.Bake.calculateHiRes({
    // ?
  }).then(console.log)
```
# A-Frame Components

## What can be done with the components

If you are building a 3D web application with the [A-Frame](https://aframe.io) library
you may find it conveniet to **display 3D scenes** from your own or our public [Scene library](/docs/1/api/scene-library.html)
or **display furniture** from our [Furniture library](/docs/1/api/furniture-library.html).

This can easily be done with these components:

```html
<a-scene>
  <!-- furniture specified by id (= productResourceId) -->
  <!-- get more: https://spaces.archilogic.com/products -->
  <a-entity 3dio-furniture="id:10344b13-d981-47a0-90ac-f048ee2780a6" position="-2 0 -3.2" rotation="0 180 0"></a-entity>

  <!-- data3d files specified by 3d.io store key or URL -->
  <a-entity 3dio-data3d="key:/3f995099-d624-4c8e-ab6b-1fd5e3799173/170515-0913-4p3ktf/1e588a3b-90ac-4a32-b5b8-ff2fda7f87c4.gz.data3d.buffer" position="0 0 0"></a-entity>
</a-scene>
```
[Try out the full example here](/examples/simple-scene/index.html)

## Displaying a scene with `3dio-data3d`

| Parameter | Description |
| --- | --- |
| `key` | Specifies a 3d.io [storage key](/docs/1/api/3d-asset-storage) to identify the scene to display |
| `url` | Specifies a URL of a `.data3d.json` or `.data3d.buffer` file, e.g. `https://example.com/scenes/simple.data3d.buffer` |

## Displaying furniture with `3dio-furniture`

| Parameter | Description |
| --- | --- |
| `id` | The `productResourceId` of the desired furniture piece from the [furniture library](/docs/1/api/furniture-library.html) |

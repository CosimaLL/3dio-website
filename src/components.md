# Components

## `<base-data3d>`

Displays a 3D model in Data3D format, i.e. Archilogic models.

### Usage

```html
<a-scene>
  <a-entity base-data3d="key:/fd72bf39-9d3a-471f-a4ff-ecaa3f5ff30b/bake/2017-04-15_22-45-14_XsiltX/regular/lighting.gz.data3d.buffer"></a-entity>
</a-scene>
```

The component can used S3 keys hosted on Archilogic or any HTTP/ HTTPS URLs.

### Parameters

| Parameter | Description | Example |
| --- | --- | --- |
| `key` | S3 key to a Data3D file hosted on Archilogic | /bake/abc13/regular/lighting.gz.data3d.buffer |
| `url`| HTTP or HTTPS URL to a Data3D file | https://example.com/3d/sample.gz.data3d.buffer |

### Events

| Event name | Description |
| --- | --- |
| `model-loaded` | This event is fired when the model has finished loading,<br> but before high-resolution textures are being loaded. |

## `<base-product>`

Displays a product from the Archilogic product library.

### Usage

```html
<a-scene>
  <a-entity base-product="id:4f138629-4d06-4002-8570-cc75152ec671"></a-entity>
</a-scene>
```

### Parameters

| Parameter | Description | Example |
| --- | --- | --- |
| `id` | Product ID from the Archilogic library | 4f138629-4d06-4002-8570-cc75152ec671 |

### Events

| Event name | Description |
| --- | --- |
| `model-loaded` | This event is fired when the model has finished loading, but before high-resolution textures are being loaded. |
| `material-changed` | This event is fired when a material has been changed to one of the `availableMaterials` available. |

### Component properties

Component properties can be accessed programmatically via the `component`:

```javascript
  var product = document.querySelector('a-entity#shelf')
  var baseProductComponent = product.components['base-product']
  console.log(baseProductComponent.productInfo.productDisplayName)
```

| Property | Description | Type |
| --- | --- | --- |
| `productInfo` | Information about the product, such as a preview image, product name and description, bounding box, categories, etc. | Object |
| `data3d` | The Data3D object, containing meshes and materials | Object |
| `availableMaterials` | A dictionary containing a list of material names (strings) | Object |

### Dynamic parameters

Each product can contain one or more parts (called `meshes`), each of which can have alternative materials to choose from.
The meshes and materials are exposed via component properties and can be changed

* imperatively, using the `components['base-product'].meshes[meshName].material` interface
* declaratively, using the dynamic parameters (see below)
* via the inspector

The dynamic properties are generated from the mesh name and are named `material_<MESHNAME>`, where `<MESHNAME>` is to be changed to the name of the mesh that can be configured with this property.

For instance, if we have a shelf with a two meshes, "frame" and "boards", the properties would be named `material_frame` and `material_boards`.
The available values for each of them can be obtained via the `availableMaterials` property. For example:

```javascript
  var product = document.querySelector('a-entity#shelf')
  var baseProductComponent = product.components['base-product']

  console.log('Materials for the frame:', baseProductComponent.availableMaterials.frame)
  console.log('Materials for the boards:', baseProductComponent.availableMaterials.boards)
```

Here are two full examples:

* [Material selection](examples/material-selection/index.html) shows how to select and change materials
* [Declarative materials](examples/declarative-materials/index.html) shows how to declaratively pick materials
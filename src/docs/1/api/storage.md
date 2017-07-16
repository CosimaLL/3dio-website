# Storage

Large-scale object storage service: upload and download files referenced by keys. Based on [Amazon S3](https://en.wikipedia.org/wiki/Amazon_S3).

## API

### 3dio.js
* Upload file: `IO3D.storage.put(blob, options)`
* Download file: `IO3D.storage.get(storageKey, options)`

### REST
* Get file: `https://storage.3d.io/<storage-key>`

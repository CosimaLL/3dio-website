# Storage

Large-scale file storage service designed for 3D assets. It enables you to upload files easily and delivers them to your apps over a fast and reliable CDN.

## File Key

Every file has its own unique file key consisting of the user UUID and a custom path:
```text
/535e624259ee6b0200000484/example/floorplan.jpg
|                        |       |            |
| ------- userId ------- |       |            |
|                                |            |
| ------------ dir ------------- |            |
|                                             |
| ------------------- key ------------------- |
```

## Accessing Files

Using the file key you can access your file in multiple ways.

## URL

Every file has its own URL: Simply append the key to: `https://storage.3d.io`

Example:
```text
https://storage.3d.io/535e624259ee6b0200000484/example/floorplan.jpg
|                    |                                             |
| ----- domain ----- | ------------------- key ------------------- |
|                                                                  |
| ----------------------------- url ------------------------------ |
```

## No CDN Cache URL

Access file directly without CDN caching.

Example:
```text
https://storage-nocdn.3d.io/535e624259ee6b0200000484/example/floorplan.jpg
```

## io3d.js

```javascript
IO3d.storage.get(key, options)
```

# Uploading Files 

## 3dio.js

Upload single file:
```javascript
var file = new Blob(['Hello World'], { type: 'text/plain' })

IO3d.storage.put(file).then(function(key){
  console.log('Your new file key is:', key)
})
```

Upload single file to a specific location:
```javascript
var file = new Blob(['Hello World'], { type: 'text/plain' })

IO3d.auth.login({
  username: 'your-username-here',
  username: 'your-password-here'
}).then(function(session){
  IO3d.storage.put(file,{
    key: '/' + session.user.id + '/my-folder-name/my-file-name.txt'
  })
}).then(function(key){
  console.log('Done')
})
```

Upload single file to a specific location shortcut:
```javascript
var file = new Blob(['Hello World'], { type: 'text/plain' })

IO3d.storage.put(file,{
  // {{userId}} will get replaced internally by the currently logged in user id.
  key: '/{{userId}}/my-folder-name/my-file-name.txt'
}).then(function(key){
  console.log('Done')
})
```

Upload multiple files to a specific directory:
```javascript
// use file name property: 
var files = [
  new Blob(['Hello World!!'], { name: 'foo.txt', type: 'text/plain' }),
  new Blob(['Howdy Partner'], { name: 'bar.txt', type: 'text/plain' })
]

IO3d.storage.put(files,{
  // {{userId}} will get replaced internally by the currently logged in user id.
  dir: '/{{userId}}/my-folder-name/'
}).then(function(keys){
  console.log('Done. File keys are:', keys)
})
```

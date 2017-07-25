# Storage

Large-scale file storage service designed for 3D assets. It enables you to upload files easily and delivers them to your apps over a fast and reliable CDN.

## Access

### File Key

Every file has its own unique file key consisting of an user ID and a custom component:
```text
/535e624259ee6b0200000484/example/floorplan.jpg
|                        |       |            |
| ------- userId ------- |       |            |
|                                |            |
| ------------ dir ------------- |            |
|                                             |
| ------------------- key ------------------- |
```

### URL

Simply prepend `storage.3d.io` to any file key:

https://storage.3d.io/535e624259ee6b0200000484/example/floorplan.jpg

### No CDN Cache URL

Access file directly without CDN caching via `storage-nocdn.3d.io` :

https://storage-nocdn.3d.io/535e624259ee6b0200000484/example/floorplan.jpg

## Uploading Files 

### Upload single file:
```javascript
var file = new Blob(['Hello World'], { type: 'text/plain' })

IO3d.storage.put(file).then(function(key){
  console.log('Your new file key is:', key)
})
```

### Upload single file to a specific location:
```javascript
var file = new Blob(['Hello World'], { type: 'text/plain' })

IO3d.auth.login({
  username: 'your-username-here',
  username: 'your-password-here'
}).then(function(session){
  return IO3d.storage.put(file,{
    key: '/' + session.user.id + '/my-folder-name/my-file-name.txt'
  })
}).then(function(key){
  console.log('Done')
})
```

### Upload single file to a specific location shortcut:
```javascript
var file = new Blob(['Hello World'], { type: 'text/plain' })

IO3d.storage.put(file,{
  // {{userId}} will get replaced internally by
  // the currently logged in user id.
  key: '/{{userId}}/my-folder-name/my-file-name.txt'
}).then(function(key){
  console.log('Done')
})
```

### Upload multiple files to a specific directory:
```javascript
// use file name property: 
var files = [
  new Blob(['Hello World!!'], { type: 'text/plain' }),
  new Blob(['Howdy Partner'], { type: 'text/plain' })
]

IO3d.storage.put(files,{
  // {{userId}} will get replaced internally by
  // the currently logged in user id.
  dir: '/{{userId}}/my-folder-name/'
}).then(function(keys){
  console.log('Done. File keys are:', keys)
})
```

# Storage

Large-scale file storage service designed to handle 3D assets. It enables you to upload even large files easily and delivers them to your apps over fast and reliable CDN.

## Access

### File Key

Every file has its own unique file key consisting of the user ID and a custom component:
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

### Upload a single file:
```javascript
var file = new Blob(['Hello World'])
file.name = 'hello.txt'

IO3D.storage.put(file).then(function (key) {
  console.log('Your new file key is:', key)
})
```

### Upload multiple files:
```javascript
var file1 = new Blob(['Hello World!!'])
file1.name = 'my-filename.txt'

var file2 = new Blob(['Howdy Partner'])
file2.name = 'another-filename.txt'

IO3D.storage.put([file1, file2]).then(function (keys) {
  console.log('Done. File keys are:', keys)
})
```

### Upload file to a specific location:
```javascript
var file = new Blob(['Hello World'])

// uploading a file to specific location requires login 
IO3D.auth.login({
  username: 'your-username-here',
  username: 'your-password-here'
}).then(function (session) {
  return IO3D.storage.put(file, {
    key: '/' + session.user.id + '/my-folder-name/my-file-name.txt'
  })
}).then(function (key) {
  console.log('Done')
})
```

### Upload file to a specific location using template shortcut:
```javascript
var file = new Blob(['Hello World'])

IO3D.storage.put(file, {
  // {{userId}} will get replaced internally by the currently logged-in
  // user id. Not being logged-in will result in the promise being rejected.
  key: '/{{userId}}/my-folder-name/my-file-name.txt'
}).then(function onSuccess (key) {
  console.log('Done')
}, function onReject () {
  console.error('Please log in first')
})
```
### Upload multiple files to a specific directory:
```javascript
var file1 = new Blob(['Hello World!!'])
file1.name = 'my-filename.txt'

var file2 = new Blob(['Howdy Partner'])
file2.name = 'another-filename.txt'

IO3D.storage.put(files, {
  // {{userId}} will get replaced internally by the currently logged-in
  // user id. Not being logged-in will result in the promise being rejected.
  dir: '/{{userId}}/my-folder-name/'
}).then(function onSuccess (keys) {
  console.log('Done. File keys are:', keys)
}, function onReject () {
  console.error('Please log in first')
})
```

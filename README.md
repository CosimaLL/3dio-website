# 3d.io Website

First official release preview:<br>
http://3d.io/branch/1.0/

## Development

* Install: `git clone https://github.com/archilogic-com/3d-io-website.git`
* Run local dev server: `npm run dev`<br>
  Will watch files in `src` dir, rebuild and update browser window automaticaly.

## Deployment

[![Build Status](https://travis-ci.com/archilogic-com/3d-io-website.svg?token=EqpLsvSSqfB8oaHTPxqV&branch=1.0)](https://travis-ci.com/archilogic-com/3d-io-website)

* Every branch gets deployed automaticaly into a custom URL using following pattern:<br>
  `http://3d.io/branch/${branch-name}/`<br>
  Build takes ca. 2 minutes. Colored button above indicates status.
* Continuous Integration via travis CI:<br>
  https://travis-ci.com/archilogic-com/3d-io-website
* Build and distribution scripts:<br>
  https://github.com/archilogic-com/3d-io-website/blob/1.0/tasks/build.js<br>
  https://github.com/archilogic-com/3d-io-website/blob/1.0/tasks/dist.js<br>

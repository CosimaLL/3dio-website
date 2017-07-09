# 3d.io Website

[![Build Status](https://travis-ci.com/archilogic-com/3d-io-website.svg?token=EqpLsvSSqfB8oaHTPxqV&branch=1.0)](https://travis-ci.com/archilogic-com/3d-io-website)

Official release preview:<br>
http://3d.io/branch/1.0/

## Editing

All content resides in `src` folder. Beside html and css the following file types are supported:
* `.pug` templates https://www.npmjs.com/package/pug
* `.md` markdown files https://help.github.com/categories/writing-on-github/
* `.less` files http://lesscss.org/

Non-native browser file types will get precompiled during build process in order to serve the entire site as static data.

## Deployment

* Every branch gets deployed automaticaly into a custom URL using following pattern:<br>
  `http://3d.io/branch/${branch-name}/`<br>
  Build takes ca. 2 minutes.
* Continuous Integration via travis CI:<br>
  https://travis-ci.com/archilogic-com/3d-io-website
* Build and distribution scripts:<br>
  https://github.com/archilogic-com/3d-io-website/blob/1.0/tasks/build.js<br>
  https://github.com/archilogic-com/3d-io-website/blob/1.0/tasks/dist.js<br>

## Development

* Install: `git clone https://github.com/archilogic-com/3d-io-website.git`
* Run local dev server: `npm run dev`<br>
  This will watch files in `src` dir, rebuild and update browser window automaticaly.

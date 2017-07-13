# Our Tech Philosophy

## Building blocks

We are strong supporters of modularity, following the UNIX philosophy of "do one thing and do it right".

Our components and APIs are as independent and possible to allow you to pick just what you need without having to deal with fluff you don't need.

Instead of building one all-encompassing framework we focus on what is our strong suite: 3D content (like the [scenes](https://spaces.archilogic.com/explore) and [furniture](https://spaces.archilogic.com/products) libraries) and [tooling around 3D content](#products). That's why we integrate with other providers such as [A-Frame](https://aframe.io), [Archilyse](https://archilyse.com), [Matterport](https://matterport.com) and our strong [partner network](https://spaces.archilogic.com).

You are free to pick just what you need and build your solutions from our building blocks - we strive to make it as comfortable and enjoyable as possible for you!

## Performance in mind

The web is available (almost) everyhwere - and that's great!

It's our strong belief that web content, including 3D content on th web, should be available for our users as quickly as possible while looking crisp and beautiful
on as many devices as possible.

This is why we are obsessed with performance - we are constantly tuning and tweaking the way we load assets and structure 3D information in order to allow your users
to indulge on the 3D scenes as quickly as possible!

Under the hood, we have implemented a series of techniques to make loading spinners disappear in a blink:

### Progressive loading strategy

Critical content, such as the basic structure of a model is loaded before enhancing content (such as high-detail materials) are loaded.

### Mobile-optimised
Mobile networks are wonky and data plans are often still expensive, so we are detecting whether your users are mobile and behave accordingly.

### Cloud preprocessing
In order to save as much computation power on user devices, we are operating cloud infrastructure to do the heavy-lifting of lighting calculations, format conversions and geometry optimisations.

### Data format
By researching how our 3D content is being used and structured, we were able to boil it down into a custom format to optimise for rendering speed and download size.

## Community-driven

We are striving to foster the communities around us. We want to enable as many people as possible to build whatever they can dream up.
That's why we are [open sourcing](https://github.com/archilogic-com) parts of our work, collaborate with communities such as the [A-Frame](https://aframe.io) community and are participating in exchanges on [Stack Overflow](https://stackoverflow.com/), [Reddit](https://www.reddit.com/domain/spaces.archilogic.com/), [Twitter](https://twitter.com/archilogic3d) and [Facebook](https://facebook.com/) and share our experiences as well as select 3D content on [our blog](https://spaces.archilogic.com/blog).

## Isomorphic Code

3d.io.js can run on server & browser
suitable for server side APIs using https://github.com/archilogic-com/instant-api and plugins for desktop software (run using node from command line)
[![diagram](https://docs.google.com/drawings/d/1n0qta-2ZgnsvQh4PPToj7ScNNO2ImWRRIqcO-SzFC5E/pub?w=2224&h=1392)](https://docs.google.com/drawings/d/1n0qta-2ZgnsvQh4PPToj7ScNNO2ImWRRIqcO-SzFC5E/pub?w=2224&h=1392)

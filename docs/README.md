# zircleUI

[![npm](https://img.shields.io/npm/v/zircle.svg)](https://www.npmjs.com/package/zircle) [![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

> A circular zooming UI

!> WIP

## Installation

```bash
npm install zircle --save 
```

## Usage

### Browser

```html
<!-- Include after Vue -->
<!-- Local files -->
<link rel="stylesheet" href="zircle/dist/zircle.min.css"></link>
<script src="zircle/dist/zircle.min.js"></script>

<!-- From CDN -->
<link rel="stylesheet" href="https://unpkg.com/zircle/dist/zircle.min.css"></link>
<script src="https://unpkg.com/zircle"></script>
```

### Bundler (Webpack, Rollup)

```js
import Vue from 'vue'
import zircleUI from 'zircle'
import 'zircle/dist/zircle.min.css'

Vue.use(zircleUI)
```

## License

[MIT](http://opensource.org/licenses/MIT)
<iframe width="560" height="315" src="demos/browser/index.html" frameborder="0"></iframe>

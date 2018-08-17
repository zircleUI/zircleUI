<p align="center">
  <a href="http://zircle.io">
    <img src="https://raw.githubusercontent.com/zircleUI/docs/gh-pages/zircle-ui-blue.png" width="200">
  </a>
</p>

<p align="center">
  A frontend library to develop zoomable user interfaces.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/zircle"><img src="https://img.shields.io/npm/v/zircle.svg"></a>
  <a href="https://vuejs.org/"><img alt="npm" src="https://img.shields.io/badge/vue-2.x-brightgreen.svg"></a>
  <a href="https://travis-ci.org/zircleUI/zircleUI"><img alt="Build Status" src="https://travis-ci.org/zircleUI/zircleUI.svg?branch=master"></a>
  <a href="https://codeclimate.com/github/zircleUI/zircleUI/maintainability"><img src="https://api.codeclimate.com/v1/badges/bfcc880f5084f9e828ed/maintainability" /></a>
</p>

## This is the dev branch of zircle-ui

## Contributing
Many things could be improved and enriched with you collaboration no matter if you are a developer or not. [Here you will find](https://zircleui.github.io/docs/contribute/) some guidelines for inspiration.

## Development Setup
You will need Node.js version 8+ installed.

Open a terminal and type:

```bash
git clone https://github.com/zircleui/zircleui.git
```
After cloning the repository, execute:

```bash
npm install
```

## Commonly used NPM scripts
```bash
# start demo app
npm run serve

# to check and fix code
npm run lint

# run jest unit tests
npm test

# build zircle-ui library
npm run build:zircle
```

## Project Structure

```bash
.
├── dist
├── node_modules
├── public
├── src
│   ├── components
│   │    └── child-components
│   ├── store
│   │    └── modules
│   └── styles
│        └── sass
└── tests
   └── unit

```


## License
[MIT Licensed | Copyright © 2017 - present | Juan Martín Muda](https://raw.githubusercontent.com/zircleUI/zircleUI/master/LICENSE)

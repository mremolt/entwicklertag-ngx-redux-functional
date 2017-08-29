const polyfills = [
  'core-js/es6/reflect',
  'core-js/es7/object',
  'core-js/es7/array',
  'core-js/es7/reflect',

  'web-animations-js',
  'zone.js/dist/zone'
];

const ie11 = [
  'core-js/es6',
  // IE10 & IE11 do not completely implement classList
  // needed for some edge cases with ngClass (like classes on SVG elements)
  'classlist-polyfill'
];

const ie10 = [
  'intl',
  // // add more languages if necessary for project
  'intl/locale-data/jsonp/de-DE',
  'intl/locale-data/jsonp/en-US',

  // if you make use of advanced console commands: console.group (like redux-logger), console.time etc.
  // needed for IE < 11
  'console-polyfill'
];

export const MODERN = polyfills;
export const IE11 = [...polyfills, ...ie10];
export const IE10 = [...polyfills, ...ie10, ...ie11];

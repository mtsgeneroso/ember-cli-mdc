/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');
const { version } = require ('../../package.json');
const target = require ('ember-cli-mdc-utils').target (version);

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/button', target: '3.2.0'}
  ],

  addons: [
    {name: 'ember-cli-mdc-elevation', target},
    {name: 'ember-cli-mdc-ripple', target},
    {name: 'ember-cli-mdc-rtl', target},
    {name: 'ember-cli-mdc-typography', target},
    {name: 'ember-cli-mdc-icon', target},
    {name: 'ember-cli-mdc-shape', target},
    {name: '@ember/render-modifiers'}
  ]
});

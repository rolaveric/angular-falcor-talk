import 'babel/polyfill';
import falcor from 'falcor';
import HttpDataSource from 'falcor-http-datasource';
import _ from 'lodash';
import template from 'app.html!text';

//create model:
var model = new falcor.Model({
  source: new HttpDataSource('/model.json')
});

// Get Data
model.get('genrelist[0].titles[0..2]["name", "boxshot"]')
  .then(renderData, console.error);

// Render data
var dataContainer = document.getElementById('container');
var compiledTemplate = _.template(template);
function renderData(jsonEnvelope) {
  dataContainer.innerHTML = compiledTemplate({titles: jsonEnvelope.json.genrelist[0].titles});
}
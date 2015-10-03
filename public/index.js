import 'babel/polyfill';
import falcor from 'falcor';
import HttpDataSource from 'falcor-http-datasource';
import template from './app.html!text';

const model = new falcor.Model({
  source: new HttpDataSource('/model.json')
});

const container = document.getElementById('container');

model.getValue('todos[0].name')
  .subscribe((value) => {
    container.innerHTML += template.replace('#NAME#', value);
  });

model.getValue('todos[1].name')
  .subscribe((value) => {
    container.innerHTML += template.replace('#NAME#', value);
  });
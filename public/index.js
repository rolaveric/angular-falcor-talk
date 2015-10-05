import 'babel/polyfill';
import falcor from 'falcor';
import HttpDataSource from 'falcor-http-datasource';
import template from './app.html!text';
import angular from 'angular';

class MyCtrl {
  constructor() {
    // Start model
    this.model = new falcor.Model({
      source: new HttpDataSource('/model.json')
    }).batch();

    // Get data
    this.todos = [];
    this.model.getValue('todos[0].name')
      .subscribe((value) => {
        this.todos.push(value);
      });

    this.model.getValue('todos[1].name')
      .subscribe((value) => {
        this.todos.push(value);
      });
  }
}

angular.module('falcorExample', [])
  .directive('falcorExample', () => {
    return {
      template: template,
      controller: MyCtrl,
      controllerAs: 'ctrl',
      scope: {},
      bindToContoller: true
    };
  });
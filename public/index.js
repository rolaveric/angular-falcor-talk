import 'babel/polyfill';
import falcor from 'falcor';
import HttpDataSource from 'falcor-http-datasource';
import angular from 'angular';

const template = `
<div>
  <h3>Todos: {{ctrl.todos.length}}</h3>
  <ul>
    <li ng-repeat="todoName in ctrl.todos">
      <span>{{:: $index + 1}}: </span>
      <input type="checkbox"/>
      {{:: todoName}}
    </li>
  </ul>
</div>
`;

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
import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import emailCtrl from './emails/emailCtrl';
import sanitize from 'angular-sanitize';

const app = angular.module('app', [uiRouter, sanitize]);

app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('emails', {
      url: '/',
      template: require('emails/index.html'),
      controller: emailCtrl
    });

  $locationProvider.html5Mode(true);
});

export default app;

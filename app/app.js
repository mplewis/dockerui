var angular = require('angular');
var ngRoute = require('angular-route');
var ngResource = require('angular-resource');
var ui = {bootstrap: require('angular-bootstrap-npm')};

var dockerui = {
    services: require('./shared/services'),
    filters: require('./shared/filters')
};

require('bootstrap/dist/css/bootstrap.css')
require('gritter/css/jquery.gritter.css')

require('../assets/css/app.css')

var masthead = require('./components/masthead/mastheadController');
var footer = require('./components/footer/footerController');
var dashboard = require('./components/dashboard/dashboardController');
var container = require('./components/container/containerController');
var containers = require('./components/containers/containersController');
var images = require('./components/images/imagesController');
var image = require('./components/image/imageController');
var startContainer = require('./components/startContainer/startContainerController');
var sidebar = require('./components/sidebar/sidebarController');
var info = require('./components/info/infoController');
var builder = require('./components/builder/builderController');
var containerLogs = require('./components/containerLogs/containerLogsController');
var events = require('./components/events/eventsController');

angular.module('dockerui', ['ngRoute', 'dockerui.services', 'dockerui.filters', 'masthead', 'footer', 'dashboard', 'container', 'containers', 'images', 'image', 'startContainer', 'sidebar', 'info', 'builder', 'containerLogs', 'events'])
    .config(['$routeProvider', function ($routeProvider) {
        'use strict';
        $routeProvider.when('/', {templateUrl: 'app/components/dashboard/dashboard.html', controller: 'DashboardController'});
        $routeProvider.when('/containers/', {templateUrl: 'app/components/containers/containers.html', controller: 'ContainersController'});
        $routeProvider.when('/containers/:id/', {templateUrl: 'app/components/container/container.html', controller: 'ContainerController'});
        $routeProvider.when('/containers/:id/logs/', {templateUrl: 'app/components/containerLogs/containerlogs.html', controller: 'ContainerLogsController'});
        $routeProvider.when('/images/', {templateUrl: 'app/components/images/images.html', controller: 'ImagesController'});
        $routeProvider.when('/images/:id*/', {templateUrl: 'app/components/image/image.html', controller: 'ImageController'});
        $routeProvider.when('/info', {templateUrl: 'app/components/info/info.html', controller: 'InfoController'});
        $routeProvider.when('/events', {templateUrl: 'app/components/events/events.html', controller: 'EventsController'});
        $routeProvider.otherwise({redirectTo: '/'});
    }])
    // This is your docker url that the api will use to make requests
    // You need to set this to the api endpoint without the port i.e. http://192.168.1.9
    .constant('DOCKER_ENDPOINT', 'dockerapi')
    .constant('DOCKER_PORT', '') // Docker port, leave as an empty string if no port is requred.  If you have a port, prefix it with a ':' i.e. :4243
    .constant('UI_VERSION', 'v0.6.0')
    .constant('DOCKER_API_VERSION', 'v1.17');

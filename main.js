requirejs.config({
    baseUrl: 'node_modules',
    paths: {
        app: '../app'
    }
});

require(['jQuery', 'underscore'], function($,_){
  $(document.body).addClass('FUCKIT');
});

/**
 * Created by Christophe on 02/06/2016.
 */
require.config({
    shim: {
        /*underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        }*/
    },
    paths: {
        backbone: 'bower_components/backbone/backbone',
        jquery: 'bower_components/jquery/dist/jquery',
        underscore: 'bower_components/underscore/underscore',
        svgsurface: "src/svgsurface"
    },
    waitSeconds: 60
});
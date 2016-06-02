/**
 * Created by Christophe on 02/06/2016.
 */
(function(factory) {
    var root = (typeof self == 'object' && self.self === self && self) ||
        (typeof global == 'object' && global.global === global && global);

    if (typeof define === 'function' && define.amd) {
        define(["jquery"], function($) {
            return factory($);
        });
    } else {
        root.SvgSurface = factory(root.$);
    }
})(function($) {

    return function(config) {

        var currentScale = config.defaultScale ? config.defaultScale : 1;
        var defaultGroup;


        /**
         * Création d'un conteneur svg
         * @param obj
         * @returns {Element}
         * @constructor
         */
        function SvgContainer(obj) {
            var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            for (var prop in obj) {
                svg.setAttribute(prop, obj[prop]);
            }
            return svg;
        }


        /**
         * Créé un groupe Svg
         * @param obj
         * @returns {Element}
         * @constructor
         */
        function SvgGroup(obj) {
            var group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            for (var prop in obj) {
                group.setAttribute(prop, obj[prop]);
            }
            return group;
        }


        /**
         * Création d'une ligne dans un conteneur svg
         * @param obj
         * @returns {Element}
         * @constructor
         */
        function Line(obj) {
            var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            for (var prop in obj) {
                line.setAttribute(prop, obj[prop]);
            }
            return line;
        }


        /**
         * Suppression d'une ligne svg par son id
         * @param lineId
         */
        function removeLine(lineId) {
            var lineToRemove = document.getElementById(lineId);
            if (lineToRemove)
                linesSvg.removeChild(lineToRemove);
        }


        /**
         * Change le facteur de scale de la surface svg
         * @param scale
         */
        this.setScale = function(scale) {
            currentScale = scale;
        };


        this.createGroup = function(id, position, setDefault) {

            if (setDefault === undefined) setDefault = true;

            if (!position) position = {
                x: 0,
                y: 0
            };

            var group = new SvgGroup(id, position.x, position.y);

            if (setDefault) defaultGroup = group;

            return group;
        };


        // Initialisation de la surface SVG
        var surface = new SvgContainer({
            width: config.width + "px",
            height: config.height + "px"
        });

        $(config.container).get(0).appendChild(surface);
    }
});
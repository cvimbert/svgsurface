/**
 * Created by Christophe on 02/06/2016.
 */
(function(factory) {
    var root = (typeof self == 'object' && self.self === self && self) ||
        (typeof global == 'object' && global.global === global && global);

    if (typeof define === 'function' && define.amd) {
        define(["jquery", "underscore"], function($, _) {
            return factory($, _);
        });
    } else if (typeof exports === 'object') {
        module.exports = factory(
            require("jquery"),
            require("underscore")
        );
    } else {
        root.SvgSurface = factory(root.$, root._);
    }
})(function($, _) {

    return function(config) {

        var defaultConfig = {
            defaultScale: 1,
            prefix: "svg-",
            groupPrefix: "group-",
            linePrefix: "line-",
            lineWidth: 2,
            lineColor: "#ff0000"
        };

        config = _.extend(defaultConfig, config);

        var currentScale = config.defaultScale;


        /**
         * Create a SVG container
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
         * Create a SVG group
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
         * Create a line in the SVG container
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
         * Change the scale factor of the SVG surface
         * @param scale
         */
        this.setScale = function(scale) {
            currentScale = scale;
        };


        /**
         * Create a SVG group
         * @param id
         * @param position
         * @param container
         * @returns {SvgGroup}
         */
        this.createGroup = function(id, position, container) {

            if (!container) container = surface;

            if (!position) position = {
                x: 0,
                y: 0
            };

            var group = new SvgGroup({
                id: config.prefix + config.groupPrefix + id,
                x: position.x / currentScale,
                y: position.y / currentScale
            });

            container.appendChild(group);

            return group;
        };


        /**
         * Delete a group by id
         * @param groupId
         */
        this.deleteGroup = function(groupId) {

            groupId = config.prefix + config.groupPrefix + groupId;

            var groupToRemove = document.getElementById(groupId);
            if (groupToRemove)
                groupToRemove.parentNode.removeChild(groupToRemove);
        };


        /**
         * Create a SVG line
         * @param id
         * @param from
         * @param to
         * @param style
         * @param container
         * @returns {Line}
         */
        this.createLine = function(id, from, to, style, container) {

            if (!container) container = surface;

            var defaultStyle = {
                width: config.lineWidth,
                color: config.lineColor
            };

            style = _.extend(defaultStyle, style);

            var line = new Line({
                id: config.prefix + config.linePrefix + id,
                x1: from.x / currentScale,
                y1: from.y / currentScale,
                x2: to.x / currentScale,
                y2: to.y / currentScale,
                style: "stroke:" + style.color + "; stroke-width:" + style.width
            });

            container.appendChild(line);

            return line;
        };


        /**
         *
         * @param id
         * @param from
         * @param to
         * @param style
         * @param container
         * @returns {*}
         */
        this.createUniqueLine = function (id, from, to, style, container) {

            this.deleteLine(id);
            return this.createLine(id, from, to, style, container)
        };


        /**
         * Delete a line by id
         * @param lineId
         */
        this.deleteLine = function(lineId) {

            lineId = config.prefix + config.linePrefix + lineId;

            var lineToRemove = document.getElementById(lineId);
            if (lineToRemove)
                lineToRemove.parentNode.removeChild(lineToRemove);
        };


        /**
         * Update a line (temporary)
         * @param line
         * @param properties
         * @returns {boolean}
         */
        this.updateLine = function(line, properties) {

            if ((typeof line) === "string") {
                line = document.getElementById(config.prefix + config.linePrefix + line);
                if (!line) return false;
            }

            _.each(properties, function(value, key) {
                line.setAttribute(key, value);
            });

            return true;
        };


        /**
         * Delete a SVG element
         * @param element
         */
        this.deleteElement = function(element) {
            element.parentNode.removeChild(element);
        };


        // Initialize the SVG surface
        var surface = new SvgContainer({
            width: config.width + "px",
            height: config.height + "px"
        });

        $(config.container).get(0).appendChild(surface);
    }
});
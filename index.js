'use strict';

var gutil = require('gulp-util');
var through = require('through2');
var tmpl = require('lodash.template');
var PluginError = gutil.PluginError;

var PLUGIN_NAME = 'gulp-template-compile';


module.exports = function (options) {
    options = options || {};

    function compiler (file) {
        var name = typeof options.name === 'function' && options.name(file) || file.relative.split('.')[0];

        // var NSwrapper = '\n\n' + namespace.namespace + '["'+ name.replace(/\\/g, '/') +'"] = ';
        var NSwrapper = 'export var ' +  name.replace(/\\/g,'__').replace(/-/g,'_') +' = ';
        var tmplString = file.contents.toString()
                            .replace( /\s[\r\n ]+/g, '' ) // remove new lines
                            .replace(/>\s+</g, "><");     // remove whitespaces between tags
        var template = tmpl(tmplString, options.templateSettings).source;

        return NSwrapper + template + ';\n\n';
    }

    return through.obj(function (file, enc, callback) {
        if (file.isNull()) {
            this.push(file);
            return callback();
        }

        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
            return callback();
        }

        var filePath = file.path;

        try {
            var compiled = compiler(file);

            file.contents = new Buffer(compiled);
            file.path = gutil.replaceExtension(file.path, '.js');
        } catch (err) {
            this.emit('error', new PluginError(PLUGIN_NAME, err, {fileName: filePath}));
            return callback();
        }

        this.push(file);
        callback();
    });
};

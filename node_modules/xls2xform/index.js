'use strict';

//dependencies
var path = require('path');
var _ = require('lodash');
var fs = require('fs');
var async = require('async');
var shell = require('python-shell');
var tmp = require('tmp');
tmp.setGracefulCleanup();

function fileExists(path, done) {
    fs.stat(path, function(error) {
        if (error) {
            error = new Error('No such file or directory');
            done(error);
        } else {
            done();
        }
    });
}

function normalizenResponseError(response) {
    //normalize response
    response =
        _.isArray(response) ? _.first(response) : response;

    //reference response code
    var code = response.code || 999;

    //reference row
    var row;

    //reference response messsage
    var message = response && response.message ? response.message : '';

    //process no type error
    if (message.search(/Question with no type/g) > 0) {
        //obtain row information
        row = _.first(message.match(/\[.*?\]/g));
        if (row) {
            row = row.replace(/\[(.*?)\]/g, '$1');
            row = row.replace(/row/g, '').replace(/:/g, '').trim();
        }

        //process question 
        var question =
            message.replace(/Question with no type./g, '')
            .replace(/\[.*?\]/g, '').replace(/u'/g, '"')
            .replace(/'/g, '"').trim();
        //parse question
        question = JSON.parse(question);

        //prepare message
        message =
            'Question with name ' + question.name + ' at row ' + row + ' has no associated type.';
    }

    //process Invalid question name error
    if (message.search(/Invalid question name/g) > 0) {
        //obtain row information
        row = _.first(message.match(/\[.*?\]/g));
        if (row) {
            row = row.replace(/\[(.*?)\]/g, '$1');
            row = row.replace(/row/g, '').replace(/:/g, '').trim();
        }

        //parse message
        message =
            message.replace(/\[(.*?)\]/g, '$1').replace(/row/, '')
            .replace(/\d/g, '').replace(/:/, '')
            .replace(/Names/, ' at row ' + row + '.Names').trim();

    }

    //process choices option with no name
    if (_.startsWith(message, 'On the choices sheet there') || code === 101) {
        //reset message
        if (code === 101) {
            message = _.first(response.warnings);
        }

        //obtain list
        var list = _.first(message.match(/\[.*?\]/g));
        if (list) {
            list = list.replace(/\[(.*?)\]/g, '$1').split(':')[1].trim();
        }

        //parse message
        message =
            message.replace(/\[(.*?)\]/g, '')
            .replace(/ there is a /, ', list ' + list + ' has an ').trim();
    }

    //if its error response
    if (code !== 100) {
        return new Error(message);
    }

    //else do nothing
    else {
        return null;
    }
}

module.exports = exports = function(xlsFormPath, options, done) {
    //check if XLSForm path provided
    if (!xlsFormPath || _.isFunction(xlsFormPath)) {
        done = xlsFormPath;

        var error = new Error('No XLSForm path provided');

        done(error);
    }

    //continue with conversion
    else {

        //normalize arguments
        if (options && _.isFunction(options)) {
            done = options;
            options = {};
        }

        //generate temp output path in os temporary directory
        var outputPath = tmp.fileSync(Date.now() * (Math.random() * 9));

        async.waterfall([
            //validate if path exists
            function xlsFormExists(next) {
                fileExists(xlsFormPath, next);
            },

            //convert
            function convert(next) {
                //merge options
                options = _.merge({}, options, {
                    mode: 'json',
                    scriptPath: path.join(__dirname, 'python'),
                    args: [xlsFormPath, outputPath.name]
                });

                shell.run('xls2xform.py', options, next);

            },

            //process response
            function respond(response, next) {

                var error = normalizenResponseError(response);

                if (error) {
                    next(error);
                } else {
                    fs.readFile(outputPath.name, 'utf-8', next);
                }

            }
        ], done);
    }
};
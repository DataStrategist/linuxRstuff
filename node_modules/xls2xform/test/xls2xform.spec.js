'use strict';

//dependencie
var path = require('path');
var fs = require('fs');
var expect = require('chai').expect;
var xls2xform = require(path.join(__dirname, '..'));
var simpleXForm = path.join(__dirname, 'xform', 'simple.xml');
var simpleXlsForm = path.join(__dirname, 'xls', 'simple.xls');

describe('xls2xform', function() {

    it('should be a function', function(done) {
        expect(xls2xform).to.be.a('function');
        done();
    });

    it('should be able to return `No XLSForm path provided` when no XLSForm path provided', function(done) {
        xls2xform(function(error, xform) {

            expect(error).to.exist;
            expect(xform).to.not.exist;
            expect(error.message).to.equal('No XLSForm path provided');

            done();
        });
    });

    it('should be able to return `No such file or directory` when no XLSForm file found', function(done) {
        xls2xform('12345', function(error, xform) {

            expect(error).to.exist;
            expect(xform).to.not.exist;
            expect(error.message).to.equal('No such file or directory');

            done();
        });
    });

    it('should be able to convert XLSForm to xForm', function(done) {
        xls2xform(simpleXlsForm, function(error, xform) {

            expect(error).to.not.exist;

            expect(xform.substring(0, 14))
                .to.be.equal(fs.readFileSync(simpleXForm, 'utf-8').substring(0, 14));

            done(error, xform);
        });
    });

    it('should be able to convert XLSForm to xForm using custom python', function(done) {
        xls2xform(simpleXlsForm, {
            pythonPath: '/usr/bin/python'
        }, function(error, xform) {

            expect(error).to.not.exist;

            expect(xform.substring(0, 14))
                .to.be.equal(fs.readFileSync(simpleXForm, 'utf-8').substring(0, 14));

            done(error, xform);
        });
    });

    describe('survey worksheet', function() {
        describe('header errors', function() {
            /*jshint quotmark:false*/

            it('should be able to throw error when type or name column header are invalid', function(done) {
                var xlsForm = path.join(__dirname, 'xls', 'survey', 'type_name.xls');

                xls2xform(xlsForm, function(error /*, xform*/ ) {

                    expect(error).to.exist;
                    expect(error.message)
                        .to.be.equal('The survey sheet must have on the first row name and type columns.');

                    done();
                });
            });

            it('should be able to throw error when no label column header', function(done) {
                var xlsForm = path.join(__dirname, 'xls', 'survey', 'label.xls');

                xls2xform(xlsForm, function(error /*, xform*/ ) {

                    expect(error).to.exist;
                    expect(error.message)
                        .to.be.equal("The survey element named 'name' has no label or hint.");

                    done();
                });
            });

            /*jshint quotmark:true*/
        });

        describe('row errors', function() {
            /*jshint quotmark:false*/
            it('should be able to throw error when no datatype given to question', function(done) {
                var xlsForm = path.join(__dirname, 'xls', 'survey', 'no_type.xls');

                xls2xform(xlsForm, function(error /*, xform*/ ) {

                    expect(error).to.exist;
                    expect(error.message)
                        .to.be.equal("Question with name picture at row 4 has no associated type.");

                    done();
                });
            });

            it('should be able to throw error when no valid datatype given to question', function(done) {
                var xlsForm = path.join(__dirname, 'xls', 'survey', 'invalid_type.xls');

                xls2xform(xlsForm, function(error /*, xform*/ ) {

                    expect(error).to.exist;
                    expect(error.message)
                        .to.be.equal("Unknown question type 'geopointiii'.");

                    done();
                });
            });

            it('should be able to throw error when variable naming does not follow xform convection', function(done) {
                var xlsForm = path.join(__dirname, 'xls', 'survey', 'variable_name.xls');

                xls2xform(xlsForm, function(error /*, xform*/ ) {

                    expect(error).to.exist;
                    expect(error.message)
                        .to.be.equal("Invalid question name web browsers at row 7.Names must begin with a letter, colon, or underscore.Subsequent characters can include numbers, dashes, and periods.");

                    done();
                });
            });

            it('should be able to throw error when question does not have associated label', function(done) {
                var xlsForm = path.join(__dirname, 'xls', 'survey', 'no_label.xls');

                xls2xform(xlsForm, function(error /*, xform*/ ) {

                    expect(error).to.exist;
                    expect(error.message)
                        .to.be.equal("The survey element named 'name' has no label or hint.");

                    done();
                });
            });
            /*jshint quotmark:true*/
        });
    });

    describe('choices worksheet', function() {
        describe('header errors', function() {
            /*jshint quotmark:false*/

            it('should be able to throw error when any of column header name is invalid', function(done) {
                var xlsForm = path.join(__dirname, 'xls', 'choices', 'invalid_header.xls');

                xls2xform(xlsForm, function(error /*, xform*/ ) {

                    expect(error).to.exist;
                    expect(error.message)
                        .to.be.equal('The choices sheet must have on the first row list_name and name.');

                    done();
                });
            });

            it('should be able to throw error when one of the required column header is missing', function(done) {
                var xlsForm = path.join(__dirname, 'xls', 'choices', 'missing_header.xls');

                xls2xform(xlsForm, function(error /*, xform*/ ) {

                    expect(error).to.exist;
                    expect(error.message)
                        .to.be.equal('The choices sheet must have on the first row list_name and name.');

                    done();
                });
            });

            /*jshint quotmark:true*/
        });

        describe('row errors', function() {
            /*jshint quotmark:false*/

            it('should be able to throw error when any option has name missing', function(done) {
                var xlsForm = path.join(__dirname, 'xls', 'choices', 'missing_optionname.xls');

                xls2xform(xlsForm, function(error /*, xform*/ ) {
                    expect(error).to.exist;
                    expect(error.message)
                        .to.be.equal("On the choices sheet, list yes_no has an option with no name.");

                    done();
                });
            });

            it('should be able to throw error when any option has name missing', function(done) {
                var xlsForm = path.join(__dirname, 'xls', 'choices', 'missing_optionlabel.xls');

                xls2xform(xlsForm, function(error /*, xform*/ ) {
                    expect(error).to.exist;
                    expect(error.message)
                        .to.be.equal("On the choices sheet, list yes_no has an option with no label.");

                    done();
                });
            });
            /*jshint quotmark:true*/
        });
    });


});
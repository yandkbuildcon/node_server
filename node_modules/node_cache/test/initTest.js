/**
 * Created by Heorhi_Vilkitski on 1/9/2015.
 */
var assert = require('assert');
var Storage_model = require('../storage_model').storage_model;

suite('Api node_cache', function(){
    suite('Initialization',function(){
        test('global object should have storage_model', function(){
            var node_cache_instance = require('../index');
            assert.notEqual(global.storage_model,undefined)
            assert(global.storage_model instanceof Storage_model)
        });



    })
})
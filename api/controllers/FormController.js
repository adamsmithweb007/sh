/**
 * FormController
 *
 * @description :: Server-side logic for managing forms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	add:function(req,res){
        var values = req.allParams();
        var formData = {
            latitude:values.latitude,
            longitude:values.longitude,
            name:values.name,
            spread:values.spread
        };
        Form.create(formData).exec(function (err,form){
            if (err) { return res.serverError(err); }
            return res.ok(form);
        });        
    },

    get:function(req,res){
        var values = req.allParams();
        var ResultData = [];
        //var d = LocationDistance.getDistanceFromLatLonInKm(values.latitude,values.longitude,23.215635,72.636941);
        Form.find().exec(function(err,results){
            if(err) {return res.serverError();}
           results.forEach(function(element) {
                var d = LocationDistance.getDistanceFromLatLonInKm(values.latitude,values.longitude,element.latitude,element.longitude);
                console.log(d,element.name);
                if(d<=100){
                ResultData.push(element);
                 }
            });
            res.ok(ResultData);
        });   
    },
};


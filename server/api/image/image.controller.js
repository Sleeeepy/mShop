'use strict';

var _ = require('lodash');
var Image = require('./image.model');

var gm = require('gm');
var fs = require('fs');

// Get list of images
exports.index = function(req, res) {
  Image.find(function (err, images) {
    if(err) { return handleError(res, err); }
    return res.json(200, images);
  });
};

// Get a single image
exports.show = function(req, res) {
  Image.findById(req.params.id, function (err, image) {
    if(err) { return handleError(res, err); }
    if(!image) { return res.send(404); }
    return res.json(image);
  });
};

// Creates a new image in the DB.
exports.create = function(req, res) {
  var pathnew=__dirname+'\\result.png',
      pattern =__dirname+'\\pattern.png',
      item = __dirname+'\\tshirt.png';
      console.log(item,pattern);
  if(!fs.readFileSync(pattern)){console.log('pattern missing');}
  if(!fs.readFileSync(item)){console.log('item missing');}


    gm(pattern)
  .composite(item)
  .displace(30,30)
  //.mask(item)
  .write(pathnew,function(err){
    gm(pattern)
    .composite(pathnew)
    .mask(item)
    .compose('Multiply')
    .write(pathnew,function(err){

        if(err){console.log('gm err: ',err)}
        var img = fs.readFileSync(pathnew);
        res.writeHead(200, {'Content-Type': 'image/png' });
        res.end(img, 'binary');

    });


  });
  //req.files.image.path
  //gm('c:\\pattern.png').resize(30, 30, '%')
  //.region(130, 170, 307, 0).charcoal(2)
  //.region(132, 172, 207, 234).charcoal(2)
  //.region(200, 300, 0, 0).solarize(0.4)
  //.minify()
  //.composite('C:\\whiteshirt.jpg').contrast(4)
  //.displace(50,50)


  /*  .write(pathnew,function(err){
      if(err){console.log('gm err: ',err)}
      var img = fs.readFileSync(pathnew);
      res.writeHead(200, {'Content-Type': 'image/jpg' });
      res.end(img, 'binary');
    });*/
    /*
  Image.create({path:req.files.image.path}, function(err, image) {
    if(err) { return handleError(res, err); }
    return res.json(201, image);
  });*/
};

// Updates an existing image in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Image.findById(req.params.id, function (err, image) {
    if (err) { return handleError(res, err); }
    if(!image) { return res.send(404); }
    var updated = _.merge(image, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, image);
    });
  });
};

// Deletes a image from the DB.
exports.destroy = function(req, res) {
  Image.findById(req.params.id, function (err, image) {
    if(err) { return handleError(res, err); }
    if(!image) { return res.send(404); }
    image.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}

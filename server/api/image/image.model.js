'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var Upload = require('s3-uploader');




var ImageSchema = new Schema({
  name: String,
  info: String,
  path: String,
  versions:{
      org:{
          width: Number,
          height: Number,
          url: String
        },
      lg:{
          width: Number,
          height: Number,
          url: String
          },
      md:{
          width: Number,
          height: Number,
          url: String
          },
      sm:{
          path: String,
          width: Number,
          height: Number,
          url: String
          }
  }
});


var client = new Upload('ezpublicimages', {
  aws:{region: 'eu-central-1',
      path: 'images/',
      acl: 'public-read',
      accessKeyId:'AKIAIGCV7EHO4FNT4OSA',
      secretAccessKey:'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'
      },
  versions: [{
    original: true
  },{
    suffix: '-large',
    //
    quality: 80,
    maxHeight: 1040,
    maxWidth: 1040,
  },{
    suffix: '-medium',
    maxHeight: 780,
    maxWidth: 780
  },{
    suffix: '-small',
    maxHeight: 320,
    maxWidth: 320
  }]
});
/*
client.upload(req.files.image.path, {}, function(err, images, meta) {
if (err) {
  return handleError(res, err);
} else {
  for (var i = 0; i < images.length; i++) {


  }
  return res.json(images);
}
});*/

ImageSchema.pre('validate',function(next){
  console.log(this);
  var self = this;
  client.upload(self.path, {}, function(err, images, meta) {
    console.log(self);
    console.log(images[0]);
    console.log(images[1]);
    if (err) {return err;}
    self.path = images[0].path;
    self.versions = {org : images[0],
                      lg : images[1],
                      md : images[2],
                      sm : images[3]};
    console.log(self);
    next();
  });


});





module.exports = mongoose.model('Image', ImageSchema);

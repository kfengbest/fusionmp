var mongoose = require('mongoose'),
    crypto   = require('crypto');
var Schema = mongoose.Schema;
var _ = require("underscore");

var ProjectSchema = new mongoose.Schema({
 title: String,
 description: String,
 imgUrl: String,
 budget: String,
 status: {
    type: String,
    default: 'wip'
 },
 deadline: String,
 designers: [{
 	fusionfile: String,
  fusionopenlink: String,
  fusionfilepreview: String,
  status: String,
 	designer: {
    username: String,
    userid: String,
    userimage: String
 	}
 }],
 owner: {
    username: String,
    userid: String,
    userimage: String
  }
});

var createSha = function(url) {
  var shasum = crypto.createHash('sha1');
  shasum.update(url);
  return shasum.digest('hex').slice(0, 5);
};

ProjectSchema.pre('save', function(next){
  next();
});

ProjectSchema.methods = {
    addDesigner: function(user, fileUrl, openlink, cb) {
        this.designers.splice(0, 0, {
            fusionfile: fileUrl,
            fusionopenlink: openlink,
            designer: user
        });

        this.save(cb);
    }


};    

module.exports = mongoose.model('Project', ProjectSchema);

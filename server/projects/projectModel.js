var mongoose = require('mongoose'),
    crypto   = require('crypto');
var Schema = mongoose.Schema;

var ProjectSchema = new mongoose.Schema({
 title: String,
 description: String,
 imgUrl: String,
 budget: Number,
 status: String,
 enddate: Date,
 designers: [{
 	fusionfile: String,
 	designer: {
 		type: Schema.ObjectId,
 		ref: 'users'
 	}
 }],
 owner: {
    type: Schema.ObjectId,
    ref: 'users'
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
    addDesigner: function(user, fileUrl, cb) {
        this.designers.splice(0, 0, {
            fusionfile: fileUrl,
            designer: null
        });

        this.save(cb);
    }
};    

module.exports = mongoose.model('Project', ProjectSchema);

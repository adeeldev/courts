var express = require('express');
var router = express.Router();
var eventModel = require('../models/eventModel');
var Busboy = require('busboy');
router
	.post('/uploads', function (req, res){
		var busboy = new Busboy({headers: req.headers});
		busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
			
			var fleName = filename.replace(/\s+/g, '_');
			console.log(fleName);
			if (mimetype.indexOf('image/') != -1 || mimetype.indexOf('audio') != -1 || mimetype.indexOf('pdf') != -1 || mimetype.indexOf('mp4') != -1) {
				var type  = mimetype;
				var res = type.split("/");
				console.log(res);
				if(res[0] == 'image'){
					var newPath = __dirname	+ '/../public/images/'+fleName;
				}else if(res[0] == 'video'){
					var newPath = __dirname	+ '/../public/presentation/'+fleName;
				}else if(res[0] == 'application'){
					var newPath = __dirname	+ '/../public/presentation/'+fleName;
				}else{
					console.log('File Type is not found!!');	
				}
				
				file.pipe(fs.createWriteStream(newPath));
			} else {
				res.end('Invalid file type');
			}
		}).on('finish', function() {
			res.send({answer: 'File transfer Complete'});
		}).on('error', function(err) {
			res.end(err);
		});
		return req.pipe(busboy);
	});

module.exports = router;
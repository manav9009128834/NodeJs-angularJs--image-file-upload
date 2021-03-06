var express = require('express');
var mongoose = require('mongoose');
var multer = require('multer');
var path = require('path');

var router = express.Router();


router.get('/',function(req,res){
	res.render('index',{title:'NodeJs-AngularJs File Upload'});
});


//set multer diskstorage
var storage = multer.diskStorage({
	destination: function(req,file,callback){
		callback(null, './public/uploads');
	},
	filename: function(req,file,callback){
		callback(null,file.fieldname+'_'+file.originalname.replace(path.extname(file.originalname),'_')+'_'+Date.now()+path.extname(file.originalname));
			}
});

var upload = multer({ storage: storage }).single('file');

router.post('/image-upload',function(req,res){
	upload(req,res,function(err){
		if(err){
			res.json({success:false,msg:'Some error'});
		    return;
		}
		
		res.json({success:true,msg:'Image uploaded successfully',img_path:req.file.filename});
		console.log('filename:'+req.file.filename);
	})
});
module.exports = router;
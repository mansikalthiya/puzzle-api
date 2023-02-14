var express = require('express');
var usercontroller = require('../controller/user');
var final = require('../module/category');
var puzzel = require('../module/puzzel');
var router = express.Router();
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + file.originalname)
  }
})

const upload = multer({ storage: storage })

/* GET home page. */
router.post('/sigup', usercontroller.signup);
router.post('/login', usercontroller.login);

router.post('/add', upload.fields([{ name: 'bgimage', maxCount: 2 }, { name: 'icon', maxCount: 4 }]), usercontroller.add);
router.get('/delete', usercontroller.delete);
router.post('/update', upload.fields([{ name: 'bgimage', maxCount: 2 }, { name: 'icon', maxCount: 4 }]), usercontroller.update);
router.get('/show',usercontroller.secure,  usercontroller.show);

router.post('/puzzadd', upload.single('queimage'), usercontroller.puzzadd);
router.get('/puzzdel', usercontroller.puzzdel);
router.post('/puzzupdate', upload.single('queimage'), usercontroller.puzzupdate);
router.get('/puzzshow',usercontroller.secure, usercontroller.puzzshow);


router.get('/allcatshow',usercontroller.secure, usercontroller.allcatshow);

module.exports = router;

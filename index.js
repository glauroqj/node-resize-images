const express = require('express')
const app = express()
const fs = require('fs')
const AWS = require('aws-sdk')
/** libs */
const bodyParser = require('body-parser')
/** libs treat files */
const multer = require('multer')
const upload = multer()
/** services */
const resizeImageService = require('./service/resizeImage')
/** aws instance */
// AWS.config.update({
//   accessKeyId: ACCESS_KEY,
//   secretAccessKey: SECRET_KEY,
//   region: REGION
// })
// const s3 = new AWS.S3()

app.get('/', function (req, res) {
  res.status(200)
  res.send('hello world')
  // fs.readFile('./images/test.jpg', function(err, data) {

  //   if (!err) {

  //     sharp(data)
  //     .resize({ height:100, width:100})
  //     .toFile(`./images/new-test.webp`)
  //     .then(function(newFileInfo){
    
  //       // fs.writeFile(filename, data, [encoding], [callback])
    
  //       console.log("Image Resized", newFileInfo)
  //       res.send(`DONE : FINAL SIZE ${newFileInfo.size} B`)
  //     })
  //     .catch(function(err){
  //       console.log("Got Error ", err)
  //       res.send('ERROR')
  //     })

  //   }

  // })

})

app.post('/upload', upload.single('image'), function (req, res) {

  console.log('< /upload : req.body > ', req.file)

  resizeImageService(req.file)
  .then(response => {

    /** upload to S3 */

    res.status(200).send(`RESIZE DONE `)
  })
  .catch(e => {
    console.warn('< ERROR > ', e)
    res.status(403).send({error: String(e)})
  })
})

app.listen(9000, function () {
  console.log(`http://localhost:9000`)
 })
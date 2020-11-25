/** libs */
const sharp = require('sharp')

function _formatName(name) {
  const newName = name.replace(/(.jpg|.png|.jpeg|.gif|.svg)/gi, '')
  return newName
} 

function _resizeDevices(payload) {
  return new Promise(function (resolve) {

    sharp(payload.image)
    .resize(payload.size)
    .toFile(`./images-temp/${payload.device}-${payload.name}.${payload.format}`)
    .then(function(data){
  
      // fs.writeFile(filename, data, [encoding], [callback])
  
      console.log("Image Resized", data)
      resolve({
        name: `${payload.device}-${payload.name}.${payload.format}`
      })
      // res.send(`DONE : FINAL SIZE ${newFileInfo.size} B`)
    })
    .catch(function(err){
      console.log("Got Error ", err)
      reject(err)
      // res.send('ERROR')
    })

  })
}

function resizeImage(image) {
  return new Promise(function (resolve, reject) {

    console.log('< RESIZE IMAGE SERVICE > ', image)

    Promise.all([
      _resizeDevices({
        name: _formatName(image.originalname),
        device: 'desktop-contain',
        size: { fit: sharp.fit.contain, width:250},
        image: image.buffer,
        format: '.png'
      }),
      _resizeDevices({
        name: _formatName(image.originalname),
        device: 'desktop-cover',
        size: { fit: sharp.fit.contain, width:250},
        image: image.buffer,
        format: '.webp'
      }),
      _resizeDevices({
        name: _formatName(image.originalname),
        device: 'desktop-inside',
        size: { fit: sharp.fit.contain, width:250},
        image: image.buffer,
        format: '.png'
      }),
      _resizeDevices({
        name: _formatName(image.originalname),
        device: 'mobile',
        size: { fit: sharp.fit.contain, width:200},
        image: image.buffer,
        format: '.webp'
      })
    ])
    .then(response => {
      console.log('< PROMISE ALL : DONE > ', response)
      resolve(response)
    })
    .catch(e => {
      console.warn('< PROMISSE ALL : ERROR > ', e)
      reject(e)
    })

  })
}

module.exports = resizeImage
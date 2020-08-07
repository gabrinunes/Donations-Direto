const crypto = require('crypto')

module.exports = function generetaUniqueId(){
   return crypto.randomBytes(4).toString('HEX')
}
import jwt from 'jsonwebtoken'

const generateToken = (id) => {
  //we are going to sign our token with an Id Payload

  //Parts of a JWT Token
  //Very Important

  //(a)Header
  //(b)Payload
  //(c)ExpirationTime
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

export default generateToken

import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

//@desc Auth User & get Token
//@route POST /api/users/login
//@access  Public

//Validate the Email and Password,
//Send back some data, including a token, that can be saved on the client
//The used to access protected routes later.
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: null,
    })
  } else {
    res.status(401)
    throw new Error('Invalid Email or Password')
  }
})

export { authUser }

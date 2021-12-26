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

  res.json(user)
})

export { authUser }

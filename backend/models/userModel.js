import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
//Structure of the Collection
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timeStamps: true }
)

//custom method in my Model
//We can be able to get any of the models fields with this
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}
//creating the collection itself
const User = mongoose.model('User', userSchema)

export default User

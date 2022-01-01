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
  { timestamps: true }
)

//custom method in my Model
//We can be able to get any of the models fields with this
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

//hash passwords before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    //if password is not modified there is no need of Updating the Salt
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})
//creating the collection itself
const User = mongoose.model('User', userSchema)

export default User

import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Mbugua Caleb',
    email: 'caleb@mbugua.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Wanjiru Mercy',
    email: 'mercy@wanjiru.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Karanja Humphrey',
    email: 'humphrey@karanja.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users

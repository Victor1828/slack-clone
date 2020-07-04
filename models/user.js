import { DataTypes } from 'sequelize'
import sequelize from '../config/db'

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  password: DataTypes.STRING
})

export default User

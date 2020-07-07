import { DataTypes } from 'sequelize'
import sequelize from '../config/db'
import Team from './team'
// import Message from './message'

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      len: {
        args: [3, 25],
        msg: 'Username must be between 3 and 25 characters long'
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: {
        args: true,
        msg: 'Email must be a valid email'
      },
    }
  },
  password: DataTypes.STRING,
  salt: DataTypes.STRING
})

User.belongsToMany(Team, { through: 'members' })
// User.hasMany(Message)
User.hasMany(Team, {
  foreignKey: {
    name: 'owner',
    allowNull: false
  }
})

export default User

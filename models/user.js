import { DataTypes } from 'sequelize'
import sequelize from '../config/db'
import Team from './team'
// import Message from './message'

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true
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

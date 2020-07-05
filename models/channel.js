import sequelize from '../config/db'
import { DataTypes } from 'sequelize'
import Message from './message'
import Team from './team'
import User from './user'

const Channel = sequelize.define('Channel', {
  name: DataTypes.STRING,
  public: DataTypes.BOOLEAN
})

Channel.belongsTo(Team)
Channel.hasMany(Message)
Channel.belongsToMany(User, { through: 'channel_members' })

export default Channel

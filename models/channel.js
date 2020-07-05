import sequelize from '../config/db'
import { DataTypes } from 'sequelize'
import Message from './message'
import Team from './team'
import User from './user'

const Channel = sequelize.define('Channel', {
  name: DataTypes.STRING,
  public: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
})

Channel.belongsTo(Team, {
  foreignKey: { allowNull: false }
})
Channel.hasMany(Message, {
  foreignKey: { allowNull: false }
})
Channel.belongsToMany(User, { through: 'channel_members' })

export default Channel

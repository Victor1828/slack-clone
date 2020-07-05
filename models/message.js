import { DataTypes } from 'sequelize'
import sequelize from '../config/db'
import User from './user'
// import Channel from './channel'

const Message = sequelize.define('Message', {
  text: DataTypes.STRING
})

Message.belongsTo(User)
// Message.belongsTo(Channel)

export default Message

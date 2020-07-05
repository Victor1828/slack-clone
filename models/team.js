import sequelize from '../config/db'
import { DataTypes } from 'sequelize'
// import User from './user'
// import Channel from './channel'

const Team = sequelize.define('Team', {
  name: {
    type: DataTypes.STRING,
    unique: true
  }
})

// Team.belongsToMany(User, { through: 'Member' })

// Team.belongsTo(User, {
//   foreignKey: 'owner'
// })

// Team.hasMany(Channel)

export default Team

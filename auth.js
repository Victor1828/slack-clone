import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const createToken = (user, key, expiresIn) => {
  const { id } = user

  return jwt.sign(
    {
      user: { id }
    },
    key,
    {
      expiresIn
    }
  )
}

export const login = async (email, password, models) => {
  const user = await models.User.findOne({ where: { email } })
  const loginError = {
    success: false,
    errors: [{ path: 'user', message: 'Email or password are invalid' }]
  }

  if (!user) return loginError

  const hashedPassword = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex')

  if (user.password !== hashedPassword) return loginError

  const token = createToken(user, process.env.JWT_KEY, '1h')
  const refreshToken = createToken(user, process.env.REFRESH_JWT_KEY, '7d')

  return {
    success: true,
    token,
    refreshToken
  }
}

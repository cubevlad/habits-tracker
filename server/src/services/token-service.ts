import { PrismaService } from './prisma-service'
import { sign } from 'jsonwebtoken'
import { Request } from 'express'
import { decode } from 'jsonwebtoken'
import { TypedJwtPayload } from '../typings/global'
class TokenService extends PrismaService {
  /**
   * generate tokens pair - access and refresh
   * @param username
   */
  public generateTokens = (username: string, userId: string) => {
    const accessToken = sign(
      { name: username, userId: userId },
      process.env.JWT_SECRET || 'username',
      {
        expiresIn: '1800s',
      }
    )
    const refreshToken = sign({ name: username }, process.env.JWT_REFRESH_SECRET || 'username', {
      expiresIn: '60d',
    })
    return {
      accessToken,
      refreshToken,
    }
  }
  // @TODO: add managing tokens from different devices
  /**
   * save refresh token into DB
   * @param userId - user id
   * @param refreshToken - generated refresh token
   */
  public saveToken = async (userId: string, refreshToken: string) => {
    // if token with userId exist we have to update this
    const foundedToken = await this.prismaClient.token.findFirst({
      where: {
        userId: userId,
      },
    })
    if (foundedToken) {
      const newToken = await this.updateToken(userId, refreshToken)
      return newToken
    }
    // save token into db
    const { token } = await this.prismaClient.token.create({
      data: {
        userId: userId,
        token: refreshToken,
      },
    })
    return token
  }
  /**
   * update token into DB
   * @param userId - user is
   * @param token - new token to save
   */
  private updateToken = async (userId: string, token: string) => {
    const { token: newToken } = await this.prismaClient.token.update({
      where: {
        userId: userId,
      },
      data: {
        token: token,
      },
    })
    return newToken
  }
  /**
   * Remove tokens
   */
  public removeToken = async (userId: string) => {
    await this.prismaClient.token.delete({
      where: {
        userId: userId,
      },
    })
  }
  /**
   * Get data from token
   */
  public getUserData = (req: Request) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token) {
      const obj = decode(token) as TypedJwtPayload
      return obj
    }
    return undefined
  }
  /**
   * Find existing token
   */
  public findToken = async (userId: string) => {
    const is_found = await this.prismaClient.token.findFirst({
      where: {
        userId: userId,
      },
    })
    return !!is_found
  }
}

export const tokenService = new TokenService()

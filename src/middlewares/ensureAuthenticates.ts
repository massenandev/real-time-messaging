import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization

  if (!authToken) {
    return response.status(401).json({
      errorCode: "invalid.token"
    })
  }

  // quando recebemos um token dentro da headers, ele vem com a estrutura: Bearer a190238n312837192n30192
  // precisa desestruturar porque so preciso do token de fato
  // [0] Bearer
  // [1] a190238n312837192n30192
  const [, token] = authToken.split(" ")

  try {
    // pra pegar o id do usuario
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayload

    request.user_id = sub

    return next()
    
  } catch (error) {
    return response.status(401).json({ errorCode: "expired.token" })
  }
}
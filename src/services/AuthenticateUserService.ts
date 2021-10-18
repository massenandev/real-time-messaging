
import axios from 'axios'
/**
 * 1- receber o codigo via string
 * 2- recuperar o access token no github - token que o GH disponibiliza pra ter acesso as infos do user
 * 3- recuperar infos do user no github
 * 3- verificar se o usuário existe no banco de dados
 * 3.1- caso sim, gera um token pra ele
 * 3.2- caso não, cria no banco de dados e gera um token
 * 4- retornar o token com as infos do user logado
 */

// ele retorna muitas infos, mas so quero o access token
//interfaces pra filtrar o retorno que quero
interface IAccessTokenResponse {
  access_token: string
}

interface IUserResponse {
  avatar_url: string
  login: string
  id: number
  name: string
}


class AuthenticateUserService {
  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token"

    //da pra definir o que se quer de retorno pro axios pelos <>
    // a informação que ta vindo no data, quando acessar, acesse com esse nome/alias
    const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      },
      headers: {
        "Accept": "application/json"
      }
    })

    const response = await axios.get<IUserResponse>('https://api.github.com/user', {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`
      }
    })

    // quando a gente usa o axios, toda info que é retornada, é inserida no data
    return response.data
  }
}

export { AuthenticateUserService }
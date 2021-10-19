// pra ter acesso às var de ambiente
import 'dotenv/config'
import express from 'express'
import http from 'http'
//responsavel por permitir ou barrar requisições dentro da aplicação
// se eu quero outras fontes pra se conectar com a aplicação, deve-se habilitar o cors
import cors from 'cors'

import { Server } from 'socket.io'

import { router } from './routes'

const app = express()
//habilita o cors pro app
app.use(cors())

// quando subir o serverhttp, o app tb sobe junto
const serverHttp = http.createServer(app)

//acesso a conexao do cliente
// permite que outras fontes se conectem
const io = new Server(serverHttp, {
  cors: {
    origin: "*"
  }
})

//ouvindo evento de conecxão pra saber se algum user se conectou na aplicação
io.on("connection", socket => {
  console.log(`Usuário conectado no docker ${socket.id}`)
})

app.use(express.json())

app.use(router)

app.get('/github', (request, response) => {
  response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})

app.get('/signin/callback', (request, response) => {
  const { code } = request.query

  return response.json(code)
})

export { serverHttp, io }

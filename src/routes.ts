import { Router } from 'express'
import { AuthenticateUserController } from './controllers/AuthenticateUserController'
import { CreateMessageController } from './controllers/CreateMessageController'
import { GetLastThreeMessagesController } from './controllers/GetLastThreeMessagesController'
import { ProfileUserController } from './controllers/ProfileUserController'
import { ensureAuthenticated } from './middlewares/ensureAuthenticates'

const router = Router()

router.post('/authenticate', new AuthenticateUserController().handle)
router.post('/messages', ensureAuthenticated, new CreateMessageController().handle)
router.get('/messages/lastthree', new GetLastThreeMessagesController().handle)
router.get('/profile', ensureAuthenticated, new ProfileUserController().handle)



export { router }
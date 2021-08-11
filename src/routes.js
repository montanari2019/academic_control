import { Router } from 'express'
import multer from 'multer'

import multerConfig from './config/multer'

import authenticate from './app/middleware/auth'

import AssociacaoController from './app/controllers/AssociacaoController'
import DadosBancariosController from './app/controllers/DadoBancarioController'
import UserController from './app/controllers/UserController'

const routes = new Router()

routes.get('/inicio', (req, res) => res.json({ ok: true }));


// Rotas da associação
routes.post('/associacaoStore', AssociacaoController.store)
routes.get('/associacoes', AssociacaoController.index)
routes.put('/associacaoUpdate/:id', AssociacaoController.update)
routes.delete('/associacaoDelete/:id', AssociacaoController.delete)

// Rotas dos dados bancários das associações
routes.post('/associacao/dadosbancarios', DadosBancariosController.store)
routes.get('/associacao/dadosbancarios', DadosBancariosController.index)
routes.get('/associacao/dadosbancarios/:id', DadosBancariosController.indexSelect)
routes.put('/associacao/dadosbancariosUpdate/:id', DadosBancariosController.update)
routes.delete('/associacao/dadosbancariosDelete/:id', DadosBancariosController.delete)

// Rotas dos usuários
routes.post('/user',multer(multerConfig).single('file') ,UserController.store)
routes.get('/users' ,UserController.index)
routes.post('/authenticate', UserController.authentication)
routes.put('/user/update',authenticate, multer(multerConfig).single('file'), UserController.update)
routes.put('/user/password', UserController.updatePassword)
routes.delete('/user/delete', authenticate, UserController.destroy)

export default routes
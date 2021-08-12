import { Router } from 'express'
import multer from 'multer'

import multerConfig from './config/multer'

import authenticate from './app/middleware/auth'

import AssociacaoController from './app/controllers/AssociacaoController'
import DadosBancariosController from './app/controllers/DadoBancarioController'
import UserController from './app/controllers/UserController'
import FaculdadeController from './app/controllers/FaculdadeController'
import ContratoController from './app/controllers/ContratoController'

const routes = new Router()

routes.get('/inicio', (req, res) => res.json({ ok: true }));


// Rotas da associação
routes.post('/associacaoStore', AssociacaoController.store)
routes.get('/associacoes', AssociacaoController.index)
routes.put('/associacaoUpdate/:id', AssociacaoController.update)
routes.delete('/associacaoDelete/:id', AssociacaoController.delete)

// Rotas dos dados bancários das associações
routes.post('/associacao/dadosbancarios', DadosBancariosController.store)
routes.get('/associacao/dadosbancarios', authenticate, DadosBancariosController.index)
routes.get('/associacao/dadosbancarios/:id',authenticate, DadosBancariosController.indexSelect)
routes.put('/associacao/dadosbancariosUpdate/:id',authenticate, DadosBancariosController.update)
routes.delete('/associacao/dadosbancariosDelete/:id',authenticate, DadosBancariosController.delete)

// Rotas dos usuários
routes.post('/user',multer(multerConfig).single('file') ,UserController.store)
routes.get('/users',UserController.index)
routes.get('/users/:id',authenticate ,UserController.indexId)
routes.get('/users/associacao/:id',authenticate ,UserController.indexAssociated)
routes.post('/authenticate', UserController.authentication)
routes.put('/user/update',authenticate, multer(multerConfig).single('file'), UserController.update)
routes.put('/user/password', UserController.updatePassword)
routes.delete('/user/delete', authenticate, UserController.delete)

// Rotas da Faculdade
routes.post('/faculdade', authenticate, FaculdadeController.store)
routes.get('/faculdades', authenticate, FaculdadeController.index)
routes.get('/faculdades/associacao/:id', FaculdadeController.indexAssociated)
routes.get('/faculdades/:id', authenticate, FaculdadeController.indexId)
routes.put('/faculdade/update/:id',authenticate, FaculdadeController.update)
routes.delete('/faculdade/delete/:id', authenticate, FaculdadeController.delete)

// Rotas do Contrato
routes.post('/contrato', ContratoController.store)
routes.get('/contratos', authenticate, ContratoController.index)
routes.get('/contrato/:id', authenticate, ContratoController.indexID)
routes.put('/contrato/update/:id',authenticate, ContratoController.update)
routes.delete('/contrato/delete/:id', ContratoController.delete)


export default routes
import { Router } from 'express'

import AssociacaoController from './app/controllers/AssociacaoController'
import DadosBancariosController from './app/controllers/DadoBancarioController'

const routes = new Router()

routes.get('/inicio', (req, res) => res.json({ ok: true }));


// Rotas da associação
routes.post('/associacaoStore', AssociacaoController.store)
routes.get('/associacoes', AssociacaoController.index)
routes.put('/associacaoUpdate/:id', AssociacaoController.update)
routes.delete('/associacaoDelete/:id', AssociacaoController.delete)

routes.post('/associacao/dadosbancarios', DadosBancariosController.store)
routes.get('/associacao/dadosbancarios', DadosBancariosController.index)
routes.get('/associacao/dadosbancarios/:id', DadosBancariosController.indexSelect)
routes.put('/associacao/dadosbancariosUpdate/:id', DadosBancariosController.update)
routes.delete('/associacao/dadosbancariosDelete/:id', DadosBancariosController.delete)

export default routes
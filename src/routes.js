import { Router } from 'express'

import AssociacaoController from './app/controllers/AssociacaoController'

const routes = new Router()

routes.get('/inicio', (req, res) => res.json({ ok: true }));

routes.post('/associacaoStore', AssociacaoController.store)
routes.get('/associacoes', AssociacaoController.index)
routes.put('/associacaoUpdate/:id', AssociacaoController.update)
routes.delete('/associacaoDelete/:id', AssociacaoController.delete)

export default routes
import app from './app'

const port = 3233

 app.listen(process.env.PORT || port, () => { 
     console.log(`Servidor rodando na porta ${port}`)
 })


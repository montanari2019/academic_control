const Associacao = require("../models/associacao")
const Yup = require("yup")

module.exports = {

    async store(req, res){
        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            cnpj: Yup.number().required().integer(),
        })

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Falha na validação'})
        }

        console.log("dados do body", req.body)

        const associacao = await Associacao.create(req.body)

        return res.json({ associacao })

    },

    async index(req, res) {
        const associacoes = await Associacao.findAll()
        return res.json({ associacoes })
    },

    async update(req, res) {

        const { id } = req.params

        console.log("ID PASSADO PELO USER",  id)

        const associacao = await Associacao.findByPk(id)

        if(!associacao) {
            return res.status(400).json({ error: 'Associação não encontrada'})
        }

        // Validade schema de dados do body

        const schema = Yup.object().shape({
            nome: Yup.string(),
            cnpj: Yup.number().min(14).max(14),
        })

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Falha na validação'})
        }


        await associacao.update(req.body)

        return res.json(associacao)

    },

    async delete(req, res) {
        const { id } = req.params
        console.log("ID PASSADO PELO USER",  id)

        const associacao = await Associacao.findByPk(id)

        if(!associacao){
            return res.status(400).json({error: 'Associação não encontrada'})
        }

        await associacao.destroy()

        return res.json({ message: 'Associação deletada'})
    },

}
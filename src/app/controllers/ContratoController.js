import Faculdade from "../models/Faculdade"
import User from "../models/User"
import Contrato from "../models/Contrato"
import * as Yup from 'yup'

const validade_1year = '2021-12-31T23:59:59'
const validade_6months = '2021-06-30T23:59:59'

class ContratoController{

    async store(req, res){

        const schema = Yup.object().shape({
            validade: Yup.number().required(),
            aprovado: Yup.boolean().required(),
            vigente: Yup.boolean().required(),
            cancelado: Yup.boolean(),
            descricao: Yup.string(),
            dias_ultilizados: Yup.number().required(),
            dias_viagem: Yup.string().required(),
            mensalidade: Yup.string().required(),
            data_vencimento: Yup.number().required(),
            id_user: Yup.number().required(),
            id_faculdade: Yup.number().required(),
            id_associacao: Yup.number().required(),
        })

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Falha na validação'})
        }

        console.log("id Associacao", req.body.id_associacao)

        const user = await User.findByPk(req.body.id_user)
        const faculdade = await Faculdade.findByPk(req.body.id_faculdade)

        if(!user){
            return res.status(404).json({ error: 'Usuário não existe'})
        }
        if(!faculdade){
            return res.status(404).json({ error: 'Faculdade não existe'})
        }
        

        if(req.body.data_vencimento < 5 || req.body.data_vencimento > 25){
            return res.status(404).json({ error: 'A data de vencimento deve ser superior ao dia 05 e inferior ao dia 25'})
        }

        

        console.log("Usário infomado", user.nome)
        console.log("Faculdade informada", faculdade.nome)


        if(req.body.validade == 12){
            req.body.validade = validade_1year
        }else{
            req.body.validade = validade_6months
        }

        const contrato = await Contrato.create(req.body)

        return res.json(contrato)
        // return res.json({ok: true})
    }

    async index(req, res) {

        const userAuth = await User.findByPk(req.userId)
        const contratos = await Contrato.findAll({
            where: { id_associacao: userAuth.id_associacao}
        })
        if(!contratos){
            return res.status(404).json({ error: 'Contratos não encontrados'})
        }
        return res.json(contratos)

    }

    async indexID(req, res){
        const { id } = req.params
        const userAuth = await User.findByPk(req.userId)
        const contrato = await Contrato.findByPk(id)

        console.log("USER", userAuth.nome)
        console.log("Contrato", contrato)

        if(!contrato){
            return res.status(404).json({ error: 'Contrato não encontrado'})
        }

        if(userAuth.id_associacao != contrato.id_associacao){
            return res.status(401).json({ error: 'Usuário não tem permissão'})
        }
        
        return res.json(contrato)
    }


    async update(req, res) {

        const schema = Yup.object().shape({
            validade: Yup.number(),
            aprovado: Yup.boolean(),
            vigente: Yup.boolean(),
            cancelado: Yup.boolean(),
            descricao: Yup.string(),
            dias_ultilizados: Yup.number(),
            dias_viagem: Yup.string(),
            mensalidade: Yup.string(),
            data_vencimento: Yup.number(),

        })

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Falha na validação'})
        }

        const { id } = req.params

        const userAuth = await User.findByPk(req.userId)
        const faculdade = await Faculdade.findByPk(req.body.id_faculdade)
        const contrato = await Contrato.findByPk(id)


        // console.log("USER", userAuth.nome)
        // console.log("Faculdade", faculdade.nome)
        // console.log("Contrato", contrat.id)

        if(!contrato){
            return res.status(404).json({ error: 'Contrato inexistente' })
        }
        if(contrato.id_associacao != userAuth.id_associacao){
            return res.status(401).json({ error: 'Usuário sem permissão para alterar esse contrato'})
        }
        if(!faculdade){
            return res.status(404).json({ error: 'Faculdade não existe'})
        }
        if(userAuth.admin != true){
            return res.status(401).json({ error: 'Usuário sem permissão'})
        }

        // Validando validade rsrs (Redundancia)
        if(req.body.validade == 12){
            req.body.validade = validade_1year
        }else{
            req.body.validade = validade_6months
        }

        // Validação dos dias de venciamento
        if(await(req.body.data_vencimento)){
            console.log("Entrando na validação do vencimento")
            if(req.body.data_vencimento < 5 || req.body.data_vencimento > 25){
                
                return res.status(400).json({ error: 'A data de vencimaento deve ser superior ao dia 05 e inferior ao dia 25'})
            }
        }

        await contrato.update(req.body)
         
        return res.json(contrato)

    }

    async delete(req, res) {

        const { id } = req.params
        const contrato = await Contrato.findByPk(id)

        if(!contrato){
            return res.status(404).json({ error: 'Contrato não econtrado'})
        }else if(contrato.cancelado != true){    
            return res.status(401).json({ error: 'Contrato ainda vigente não podemos apagalo'})
        }

        await contrato.destroy()
        return res.json({message: 'Contrato deletado'})

    }

}

export default new ContratoController()
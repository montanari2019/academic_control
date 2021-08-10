import jwt from 'jsonwebtoken'
import User from "../models/User"
import * as Yup from 'yup'
import configAuthenticate from '../../config/configAuthenticate'


class UserController{

    async store(req, res){

        const usersExists = await User.findOne({
            where: { email: req.body.email}
        })

        if(usersExists){
            return res.status(400).json({error: 'Email ja existente'})
        }

        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            email: Yup.string().required().email(),
            password: Yup.string().required().min(6),
            admin: Yup.boolean().required(),
            r_g: Yup.number().required(),
            c_p_f: Yup.number().required(),
            telefone: Yup.number().required(),
            cep: Yup.number().required(),
            endereco: Yup.string().required(),
            bairro: Yup.string().required(),
            numero: Yup.number().required(),
            cidade: Yup.string().required(),
            estado: Yup.string().required(),
            id_associacao: Yup.number().required(),
        })

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Falha na validação'})
        }



        const { key, location } = req.file

        console.log("dados do body: ", req.body)
        console.log("dados do file: ", req.file)

        const { id, nome, email, admin, foto_url, created_at } = await User.create({
            nome: req.body.nome,
            email: req.body.email,
            password: req.body.password,
            admin: req.body.admin,
            r_g: req.body.r_g,
            c_p_f: req.body.c_p_f,
            telefone: req.body.telefone,
            cep: req.body.cep,
            endereco: req.body.endereco,
            bairro: req.body.bairro,
            numero: req.body.numero,
            cidade: req.body.cidade,
            estado: req.body.estado,
            id_associacao: req.body.id_associacao,
            foto: key,
            foto_url: location
        })

        

        return res.json({
            id,
            nome,
            email,
            admin,
            foto_url,
            created_at
        })

        // return res.json({ok: true})



    }

    async index(req, res) {
        const { password_hash, ...response } = await User.findAll()
        return res.status(200).json(response)
    }

    async authentication (req, res){
        const { email, password } = req.body

        const user = await User.findOne({ where: {email} })

        console.log(password)

          //Verificando se o Usuário existe
          if(!user){
            return res.status(401).json({ erro: 'Usuário não exite'})
            
        }

        if(!(await user.checkPassword(password))){
            return res.status(401).json({ erro: 'Senha Invalida'})
        }

        const { id, nome } = user

        return res.json({ 
            user:{
                id,
                nome,
                email
            },
            token: jwt.sign({ id, }, configAuthenticate.hash,{
                expiresIn: configAuthenticate.expiration
            } )

        })


    }

    async update (req, res) {

        const id_user = req.userId
        res.json(id_user)
    }

  

}

export default new UserController()
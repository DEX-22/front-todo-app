import {number,string,object} from 'yup'

export interface ILogin{
    email: string,
    password: string
}

export interface IRegister{
    name : string,
    lastName: string,
    email: string,
    password: string
}

const name = string().min(3)
const lastName = string().min(3)
const email = string().email()
const password = string().min(8)

const RegisterSchema = object({ 
    name: name.required(),
    lastName: lastName.required(),
    email : email.required(),
    password: password.required()
})


const LoginSchema = object({ 
    email : email.required(),
    password: password.required()
})
  

export {LoginSchema,RegisterSchema}
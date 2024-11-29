import {number,string,object} from 'yup'

export interface ILogin{
    email: string,
    password: string
}

const email = string().email()
const password = string()


const LoginSchema = object({ 
    email : email.required(),
    password: password.required()
})
  

export {LoginSchema}
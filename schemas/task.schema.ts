import {object,string,number, ObjectSchema} from 'yup'
 

export interface ITask {
    title: string
    description: string
    status? :'pending' | 'in process' | 'completed' | null
}


const id = number().positive()
const title = string().min(3)
const description = string().min(3)
const status = string<'pending' | 'in process' | 'completed' >() 


const createTaskSchema: ObjectSchema<ITask> = object({
    title: title.required(),
    description: description.required(),
    status: status.notRequired()
})

const getTaskSchema = object({
    id: id.required()
})
const updateTaskSchema : ObjectSchema<ITask> = object({
    title: title.required(),
    description: description.required(),
    status: status.required()
})

export {createTaskSchema,getTaskSchema,updateTaskSchema}

 
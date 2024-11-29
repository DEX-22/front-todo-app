import type { ITask } from "../schemas/task.schema"

class TaskService{
    config
    baseUrl
    constructor(){
        this.config = useRuntimeConfig() 
        this.baseUrl = `${this.config.public.apiUrl}/tasks`
    }
    async getAll(){
        try{
            
            const rows = await $fetch(this.baseUrl)
 
            return rows
        }catch(error){
            throw new Error(error?.message)
        }
    }
    getOne(){}
    async create(data: ITask){
        try{
            
            const response = await $fetch(this.baseUrl,{
                method:'POST',
                body: JSON.stringify(data)
            }) 
            
            return response
        }catch(error){
            throw new Error(error?.message)
        }

    }
    update(){}
    delete(){}
}


export default TaskService
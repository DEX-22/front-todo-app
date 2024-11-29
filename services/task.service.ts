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
            throw new Error(error?.data.message)
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
            throw new Error(error?.data.message)
        }

    }
    async update(id:number,data: ITask){
        try{
            
            const response = await $fetch(`${this.baseUrl}/${id}`,{
                method:'PATCH',
                body:JSON.stringify(data)
            }) 
            
            return "Task was deleted."
        }catch(error){ 
            throw new Error(error.data.message)
        }
    }
    async delete(id: number){
        try{
            
            const response = await $fetch(`${this.baseUrl}/${id}`,{
                method:'DELETE'
            }) 
            
            return "Task was deleted."
        }catch(error){ 
            throw new Error(error.data.message)
        }

    }
}


export default TaskService
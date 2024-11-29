import type { ITask } from "../schemas/task.schema"

class TaskService{
    authHeader
    cookie
    config
    baseUrl
    constructor(){
        this.config = useRuntimeConfig() 
        this.baseUrl = `${this.config.public.apiUrl}/tasks`
        this.cookie = "bearer_token"
        const hash = useCookie(this.cookie).value
        this.authHeader = {"Authorization":`Bearer ${hash}`}

    }
    async getAll(){
        try{
            
            const rows = await $fetch(this.baseUrl,{
                headers:{...this.authHeader}
            })
 
            return rows
        }catch(error){
            throw new Error(error?.data.message)
        }
    }
    getOne(){}
    async create(data: ITask){
        try{
            
            const response = await $fetch(this.baseUrl,{
                headers:{...this.authHeader},
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
                headers:{...this.authHeader},
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
                headers:{...this.authHeader},
                method:'DELETE'
            }) 
            
            return "Task was deleted."
        }catch(error){ 
            throw new Error(error.data.message)
        }

    }
}


export default TaskService
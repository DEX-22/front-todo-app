class TaskService{
    config
    baseUrl
    constructor(){
        this.config = useRuntimeConfig() 
        this.baseUrl = `${this.config.public.apiUrl}/tasks`
    }
    async getAll(){
        try{
            console.log(this.baseUrl)
            const response = await fetch(this.baseUrl)
            const rows = await response.json()
            return rows
        }catch(error){
            throw new Error(error?.message)
        }
    }
    getOne(){}
    create(){}
    update(){}
    delete(){}
}


export default TaskService
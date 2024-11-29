import type { ILogin, IRegister } from "../schemas/auth.schema"

class AuthService{
    cookie
    config
    baseUrl
    constructor(){
        this.config = useRuntimeConfig() 
        this.baseUrl = `${this.config.public.apiUrl}/auth`
        this.cookie = "bearer_token"
    }
    async login(fields: ILogin){
        let data 
        
        try {
            
            data = await $fetch(`${this.baseUrl}/login`,{
                method:'POST',
                body: JSON.stringify(fields)   
            })

        } catch (error) {
            if(error.message.includes("401"))
            throw new Error("Unauthorized access");
            else 
                throw new Error(error.message);
                
            
        }

        useCookie(this.cookie).value = data?.token

        return data
    }
    logout(){

        useCookie(this.cookie).value = null

        navigateTo("/login")

    }
    async register(fields :IRegister){
        let data 
        
        try {
            
            data = await $fetch(`${this.baseUrl}/register`,{
                method:'POST',
                body: JSON.stringify(fields)   
            })

        } catch (error) {
            if(error.message.includes("401"))
            throw new Error("Unauthorized access");
            else 
                throw new Error(error.message);
                
            
        }
 
        return data
    }
}



export default AuthService
 
export default defineNuxtRouteMiddleware((from,to)=>{

    const path = {
        home:'/',
        login:'/login', 
    } 

    const bearer = "bearer_token"

    const token = useCookie(bearer).value

    if(!token){
        if( from.path != path.login && to.path != path.login){
            return navigateTo(path.login)
        }else{
            return
        }
    }

    // if(!token && to.path !== path.login) return navigateTo(path.login)
        
    // if(token&& to.path === path.login && from.path !== path.home ) return navigateTo(path.home)



 
})
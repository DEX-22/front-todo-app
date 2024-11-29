<script setup>
import {LoginSchema} from '@/schemas/auth.schema.ts'
import AuthService from '@/services/auth.service.ts'
const {$swal} = useNuxtApp()

const authService = new AuthService()

definePageMeta({
  layout: 'login'
})
const inputs = reactive({
  email: '',
  password: ''
})

const taskErrors = reactive([])
const isCharging = ref(false)

async function validateFields(){
    try {
        
        const isValid = await LoginSchema.validate(inputs,{abortEarly:false})

        return isValid
    } catch (error) { 
        const required=  'required'
        const minRequired = 'must be at least'
        
        $swal.fire({
          icon: "error",
          title: "Error",
          text: error.errors
        })
        return false
        
    }
}

async function login(){

    const dataIsValid =await validateFields()
    if (!dataIsValid) return

    try {
      isCharging.value = true
        const data = await authService.login({
        email: inputs.email,
        password: inputs.password
        })

        if(data.token){
          await navigateTo("/")
          isCharging.value = false

        }else{
          $swal.fire({
          icon: "error",
          title: "Error",
          text: data
        }) 
        }
          

    } catch (error) {
      $swal.fire({
          icon: "error",
          title: "Error",
          text: error.message
        }) 
    }finally{
      if(isCharging.value)
        isCharging.value = false

    }

}

async function goToRegister(){
  await navigateTo("/register")
}

</script>

<template>
    <div class="hero bg-base-200 min-h-screen">
  <div class="hero-content flex-col  ">
    <div class="text-center  ">

      <h1 class="text-5xl font-bold mb-2">Welcome to tasks app</h1>  
      <p class="py-6 w-80">
      </p>
    </div>
    <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div class="card-body">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input v-model="inputs.email" type="email" placeholder="email" class="input input-bordered" required/>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Password</span>
          </label>
          <input v-model="inputs.password" type="password" placeholder="password" class="input input-bordered" required />
          <!-- <label class="label">
            <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
          </label> -->
          <div v-if="taskErrors.length>0" class="flex flex-col my-2">
                <span v-for="error in taskErrors" class="text-sm text-red-500">{{ error }}</span>
            </div>

        </div>
        <div class="form-control mt-6">
          <button v-if="!isCharging" class="btn btn-primary" @click="login">
            Login
          </button>
          <button v-else disabled>
            <Loading /> 
          </button>
              
        </div>
        <div class="form-control mt-6">
          <button @click="goToRegister" class="btn btn-secondary" :disabled="isCharging">Register</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
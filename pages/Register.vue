<script setup>
import {LoginSchema} from '@/schemas/auth.schema.ts'

definePageMeta({
  layout: 'login'
})
const inputs = reactive({
  email: '',
  password: ''
})

const taskErrors = reactive([])
async function validateFields(){
    try {
        
        const isValid = await LoginSchema.validate(inputs,{abortEarly:false})

        return isValid
    } catch (error) { 
        const required=  'required'
        const minRequired = 'must be at least'
        taskErrors.splice(0,taskErrors.length)
        
        const hasRequired = error.errors.filter(e=>e.includes(required))

        if(hasRequired.length){
            taskErrors.push(...hasRequired)
            return false
        }


        const hasMinRequired = error.errors.filter(e=>e.includes(minRequired))

        if(hasMinRequired.length){
            taskErrors.push(...hasMinRequired)
            return false
        }

        taskErrors.push(...error.errors)
        return false
        
    }
}

async function saveTask(){

    const dataIsValid =await validateFields()
    if (!dataIsValid) return

    try {
        const data = await taskService.create({
        title: taskInfo.title,
        description: taskInfo.description
        })

        close(data) 

        $swal.fire({
            icon: 'success',
            title: 'Task created.'
        })

    } catch (error) {
        taskErrors.push(error.message)
    }

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
      <form class="card-body">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input v-model="inputs.email" type="email" placeholder="email" class="input input-bordered" />
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
          <button class="btn btn-primary">Login</button>
        </div>
        <!-- <div class="form-control mt-6">
          <button class="btn btn-secondary">Register</button>
        </div> -->
      </form>
    </div>
  </div>
</div>
</template>
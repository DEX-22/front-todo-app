<script setup>
import { RegisterSchema } from '@/schemas/auth.schema.ts'
import AuthService from '@/services/auth.service.ts'
const { $swal } = useNuxtApp()

const authService = new AuthService()

definePageMeta({
  layout: 'login'
})
const inputs = reactive({
  name: '',
  lastName: '',
  email: '',
  password: ''
})

const taskErrors = reactive([])

const isCharging = ref(false)

async function validateFields() {
  try {

    const isValid = await RegisterSchema.validate(inputs, { abortEarly: false })

    return isValid
  } catch (error) {
    const required = 'required'
    const minRequired = 'must be at least'

    $swal.fire({
      icon: "error",
      title: "Error",
      text: error.errors
    })
    return false

  }
}

async function register() {

  const dataIsValid = await validateFields()
  if (!dataIsValid) return
  isCharging.value = true
  try {
    const data = await authService.register({
      name: inputs.name,
      lastName: inputs.lastName,
      email: inputs.email,
      password: inputs.password
    })
    
    await $swal.fire({
      icon: "success",
      title: "User created!",
      text: "Welcome",
      confirmButtonText: "Go to login"
    })

    await navigateTo("/login")
    isCharging.value = false

  } catch (error) {
    $swal.fire({
      icon: "error",
      title: "Error",
      text: error.message
    })
  }finally{
    if(isCharging.value)
          isCharging.value = true
  }

}

function back(){
  navigateTo("/login")
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
              <span class="label-text">Name</span>
            </label>
            <input v-model="inputs.name" type="text" placeholder="email" class="input input-bordered" required />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Lastname</span>
            </label>
            <input v-model="inputs.lastName" type="text" placeholder="password" class="input input-bordered"
              required />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input v-model="inputs.email" type="email" placeholder="email" class="input input-bordered" required />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input v-model="inputs.password" type="password" placeholder="password" class="input input-bordered"
              required />
          </div>

            <div v-if="taskErrors.length > 0" class="flex flex-col my-2">
              <span v-for="error in taskErrors" class="text-sm text-red-500">{{ error }}</span>
            </div>
          <div class="form-control mt-6">
            <button v-if="!isCharging" class="btn btn-primary" @click="register">Register</button>
              
            <button v-else disabled class="btn btn-primary">
              <Loading /> 
            </button>

          </div>
          <div class="form-control mt-6">
          <button @click="back" class="btn btn-secondary" :disabled="isCharging">Back to login</button>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>
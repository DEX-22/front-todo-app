<script setup>
import TaskService from '@/services/task.service'
import {createTaskSchema} from '@/schemas/task.schema'
import {ValidationError} from 'yup'

const {$swal} = useNuxtApp()
const createTask = ref(null)
const taskInfo = reactive({
    title: "",
    description: ""
})
const taskErrors = reactive([])
const taskService = new TaskService()

const props = defineProps({
    show: { type: Boolean, required: true }
})
const emit = defineEmits(['close'])

const isOpen = computed(() => {
    return !props.show
})

watch(isOpen, async (newVal, oldVal) => {
    if (!newVal)
        open()
})

function open() { 
    createTask.value.showModal()
}
function close(task=null) {
    taskInfo.description = ""
    taskInfo.title = ""
    createTask.value.close()
    emit('close',task)
}
async function validateFields(){
    try {
        
        const isValid = await createTaskSchema.validate(taskInfo,{abortEarly:false})

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
    <dialog id="createTask" :ref="'createTask'" class="modal">
        <div class="modal-box">
            <h3 class="text-lg font-bold mb-2">Create task</h3>
            <section class="flex  justify-center flex-wrap">
                <label class="form-control w-full max-w-xs ">
                    <div class="label">
                        <span class="label-text ">Title</span> 
                    </div>
                    <input v-model="taskInfo.title" type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" /> 
                </label>
                <label class="form-control w-full max-w-xs">
                    <div class="label">
                        <span class="label-text">Description</span> 
                    </div>
                    <textarea v-model="taskInfo.description" class="textarea textarea-bordered" placeholder="Bio"></textarea>
                </label>
            </section>
            <div v-if="taskErrors.length>0" class="flex flex-col my-2">
                <span v-for="error in taskErrors" class="text-sm text-red-500">{{ error }}</span>
            </div>
            <div class="modal-action">
                <!-- if there is a button in form, it will close the modal -->
                <button @click="close" class="btn btn-accent">Close</button>
                <button @click="saveTask" class="btn btn-primary">Save</button>

            </div>
        </div>
    </dialog>
</template>
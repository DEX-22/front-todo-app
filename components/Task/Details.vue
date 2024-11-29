<script setup>
import TaskService from '@/services/task.service'
import { updateTaskSchema } from '@/schemas/task.schema'
import { ValidationError } from 'yup'
const { $swal } = useNuxtApp()
const taskService = new TaskService()

const isEditing = ref(false)


const props = defineProps({
    show: { type: Boolean, required: true },
    task: { type: Object, required: true }
})
const emit = defineEmits(['close'])


const detailTask = ref(null)
const taskInfo = reactive({
    id: null,
    title: "",
    description: "",
    status: ""
})
const taskErrors = reactive([])
const statusOptions = reactive([
    { label: "Pending", value: "pending" },
    { label: "In process", value: "in process" },
    { label: "Complete", value: "complete" }

])

function open() {
    taskInfo.title = props.task.title,
        taskInfo.description = props.task.description,
        taskInfo.status = props.task.status
    detailTask.value.showModal()
}
function close(task = null) {
    taskInfo.description = ""
    taskInfo.title = ""
    detailTask.value.close()
    emit('close', task)
}
async function validateFields() {
    try {

        const isValid = await updateTaskSchema.validate(taskInfo, { abortEarly: false })

        return isValid
    } catch (error) {
        const required = 'required'
        const minRequired = 'must be at least'
        taskErrors.splice(0, taskErrors.length)

        const hasRequired = error.errors.filter(e => e.includes(required))

        if (hasRequired.length) {
            taskErrors.push(...hasRequired)
            return false
        }


        const hasMinRequired = error.errors.filter(e => e.includes(minRequired))

        if (hasMinRequired.length) {
            taskErrors.push(...hasMinRequired)
            return false
        }

        taskErrors.push(...error.errors)
        return false

    }
}

async function saveTask() {

    const dataIsValid = await validateFields()
    if (!dataIsValid) return

    try {
        const data = await taskService.update(props.task.id, {
            title: taskInfo.title,
            description: taskInfo.description,
            status: taskInfo.status
        })

        close(data)

        $swal.fire({
            icon: 'success',
            title: 'Task updated.'
        })

    } catch (error) {
        taskErrors.push(error.message)
    }

}

const isOpen = computed(() => {
    return !props.show
})

watch(isOpen, async (newVal, oldVal) => {
    if (!newVal)
        open()
})

</script>

<template>
    <dialog id="detailTask" ref="detailTask" class="modal">
        <div class="modal-box">
            <h3 class="text-lg font-bold mb-2">Details</h3>
            <section class="flex  justify-center flex-wrap">
                <label class="form-control w-full max-w-xs ">
                    <div class="label">
                        <span class="label-text ">Title</span>
                    </div>
                    <input v-model="taskInfo.title" type="text" placeholder="Type here" :disabled="!isEditing"
                        class="input input-bordered w-full max-w-xs" />
                </label>
                <label class="form-control w-full max-w-xs">
                    <div class="label">
                        <span class="label-text">Description</span>
                    </div>
                    <textarea v-model="taskInfo.description" class="textarea textarea-bordered" :disabled="!isEditing"
                        placeholder="Bio"></textarea>
                </label>
                <label class="form-control w-full max-w-xs">
                    <div class="label">
                        <span class="label-text">Status</span>
                    </div>
                    <select v-model="taskInfo.status" class="select select-bordered w-full max-w-xs"
                        :disabled="!isEditing">
                        <option v-for="{ value, label } in statusOptions" :value="value"
                            :disabled="taskInfo.status == value">
                            {{ label }}</option>

                    </select>
                </label>

            </section>
            <div v-if="taskErrors.length > 0" class="flex flex-col my-2">
                <span v-for="error in taskErrors" class="text-sm text-red-500">{{ error }}</span>
            </div>
            <div v-if="isEditing" class="modal-action">
                <!-- if there is a button in form, it will close the modal -->
                <button @click="close()" class="btn btn-accent">Close</button>
                <button @click="saveTask" class="btn btn-primary">Save</button>

            </div>
            <div v-else class="modal-action">
                <!-- if there is a button in form, it will close the modal -->
                <button @click="close()" class="btn btn-accent">Close</button> 

            </div>
        </div>
    </dialog>
</template>
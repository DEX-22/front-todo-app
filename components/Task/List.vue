<script setup>

import TaskService from '@/services/task.service'

const taskService = new TaskService()
const { $swal } = useNuxtApp()
const showCreateModal = ref(false)
const showEditModal = ref(false)
const taskToEdit = reactive({
    id: null,
    title: "",
    description: "",
    status: ""
})


const items = reactive({
    pending: [],
    "in process": [],
    complete: []
})

const statusGroups = computed(() => {
    return Object.keys(items)
})

async function getData() {
    Object.keys(items).forEach(key => {
        items[key].splice(0, items[key].length)
    })

    let data = []

    try {

        data = await taskService.getAll()
    } catch (error) {
        $swal.fire({
            icon: 'error',
            title: 'Error!',
            text: error.message
        })
    }

    if (data.length) {
        data.map(e => {
            items[e.status].push(e)
        })
    }

}
function openModal(type) {
    if(type == 'create')
        showCreateModal.value = true 
    else if(type == 'edit')
        showEditModal.value = true
}

async function closeModal(task,type) {
    if (task) {
        await getData()
    }
    if(type == 'create')
        showCreateModal.value = false 
    else if(type == 'edit'){
        showEditModal.value = false 
        Object.keys(taskToEdit).forEach((key) => {
            delete taskToEdit[key]
        })
    }

}
function openEditModal() {
    showEditModal.value = true
}
 
async function openUpdateModal(task){
    taskToEdit.id = task.id
    taskToEdit.title = task.title
    taskToEdit.description = task.description
    taskToEdit.status = task.status  

    openModal('edit')
}
async function updateTask(task) {
    await closeModal(task,'edit')
}
async function deleteTask() { 
        await getData() 
}

onMounted(async () => {
    await getData()
})

</script>
<template>
    <div class="h-20 py-2 flex flex-row justify-end ">
        <button @click="openModal('create')" class="btn btn-primary"> Create task</button>
    </div>
    <div class="h-full flex flex-col md:flex-row md:flex-nowrap gap-4 h-max overflow-y-scroll  " >
        <TaskGroupList 
                v-for="status in statusGroups" 
                :items="items[status]" 
                :status="status" 
                @openUpdateModal="openUpdateModal($event)"
                @deleteTask="deleteTask"
                />


    </div>


    <TaskCreate :show="showCreateModal" @close="closeModal($event,'create')" />
    <TaskEdit :show="showEditModal" @close="updateTask" :task="taskToEdit" />

</template>
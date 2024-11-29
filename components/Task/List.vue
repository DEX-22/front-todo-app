<script setup>

import TaskService from '@/services/task.service'

const taskService = new TaskService()
const { $swal } = useNuxtApp()
const showCreateModal = ref(false)


const items = reactive({
    pending: [],
    "in process": [],
    completed: []
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
function openModal() {
    showCreateModal.value = true
}

async function closeModal(task) {
    if (task) {
        await getData()
    }
    showCreateModal.value = false


}

onMounted(async () => {
    await getData()
})

</script>
<template>
    <div class="h-20 py-2 flex flex-row justify-end ">
        <button @click="openModal" class="btn btn-primary"> Create task</button>
    </div>
    <div class="h-full flex flex-col md:flex-row md:flex-nowrap gap-4 h-max overflow-y-scroll  " >
        <TaskGroupList v-for="group in statusGroups" :items="items[group]" :status="group" />


    </div>


    <TaskCreate :show="showCreateModal" @close="closeModal" />
</template>
<script setup>

import TaskService from '@/services/task.service'

const taskService = new TaskService()

const items = reactive({
    pending:[],
    "in process":[],
    completed: []
})

const statusGroups = computed(()=>{
    return Object.keys(items)
})

async function getData(){
  const data = await taskService.getAll()
  
  data.map(e=>{
        items[e.status].push(e)
  })

}

onMounted(async ()=>{
    await getData()
})

</script>
<template>   
    <div class="flex flex-row flex-nowrap gap-4 "> 
        <TaskGroupList  v-for="group in statusGroups"  :items="items[group]" :status="group"/>
        
     
    </div> 

    </template>
<script lang="ts" setup>

import TaskService from '@/services/task.service'

const taskService = new TaskService()

const toPrint = reactive([])

async function getData(){
  const data = await taskService.getAll()
  console.log(data)
  data.map(e=>toPrint.push(e))

}

</script>

<template>
  <div> 
    <h1>WELCOME</h1>
  </div>
  <button @click="getData">click aqui</button>
  <pre v-if="toPrint">
    {{ toPrint }}
  </pre>
</template>

<script setup>
import TaskService from "@/services/task.service";
const {$swal} = useNuxtApp()

const service = new TaskService()

const {  item } = defineProps({
  item: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['openUpdateModal','delete','showDetails'])

function openModal(){
    emit('openUpdateModal',item)
}
async function deleteTask(){
  const {isConfirmed} = await $swal.fire({
    icon: 'question',
    title: 'Are you sure?',
    text: 'The selected task will be deleted, do you want continue?',
    showCancelButton: true
  })

  if(!isConfirmed) return 
  
  try {
    const res = await service.delete(item.id)
    $swal.fire({
      icon: 'success',
      title: 'Success',
      text: res
    })
  } catch (error) {

    //  console.dir(error)
    await $swal.fire({
      icon: 'error',
      title: 'Error',
      text: error?.message || error
    })
    return 
  }

    emit('delete')
}

function showDetails(){
  emit('showDetails',item)
}

</script>
<template>

  <div @click="showDetails" class="my-2 flex h-20 w-full flex-row flex-nowrap rounded-xl  border-2 border-slate-600 bg-slate-700 cursor-pointer">

    <div class="flex h-full w-full items-center">
      <div class="grow px-2 py-3">
        <div class="flex  ">
          <h3 class="text-md" style="text-transform:initial;">{{ item.title }}</h3>

        </div>
        <div class="flex  ">

        </div>
      </div>
      <div v-if="item.title.toLowerCase() != 'empty'" class="flex h-full gap-2 items-center justify-between mr-2">
        <button @click.stop="openModal" class="btn btn-sm btn-warning">Edit</button>
        <button @click.stop="deleteTask" class="btn  btn-sm btn-accent ">Delete</button>

      </div>
    </div>
  </div>
</template>

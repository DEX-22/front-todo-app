<script setup>
    const props = defineProps({
        items: {type: Array},
        status: {type: String}
    })

    const title = computed(()=>{
        return props.status.toUpperCase()
    })
    const items = computed(()=>{
        return props.items || []
    })
</script>

<template>
    <div class=" flex flex-wrap h-full gap-3 justify-center w-1/3 bg-slate-700 rounded-xl">
        <h2 class="text-xl font-bold w-full pl-4 py-2 bg-slate-800 rounded-t-xl">{{ title }}</h2>
        <div class="min-h-24">
            <TaskItemList v-for="(item,index) in items" :key="index" :item="item"  />  

        </div>
      </div>
</template>
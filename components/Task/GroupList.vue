<script setup>
const props = defineProps({
    items: { type: Array },
    status: { type: String }
})
const emit = defineEmits(['openUpdateModal','deleteTask','showDetails'])

const title = computed(() => {
    return props.status.toUpperCase()
})
const items = computed(() => {
    return props.items || []
})

function deleteTask() {
    emit('deleteTask')
}

function openUpdateModal(task) {
    emit('openUpdateModal',task)
}
function showDetails(task){
    emit('showDetails',task)
}
</script>

<template>
    <div class="  gap-3 justify-center  md:w-1/3 bg-slate-950 rounded-xl pb-4">
        <h2 class="text-xl font-bold w-full pl-4 py-2  rounded-t-xl">{{ title }}</h2>
        <div class="px-2 ">
            <div class="max-h-[50vh] w-full overflow-y-scroll   flex flex-col items-start">
                <TaskItemList 
                    v-if="!items.length" 
                    :key="0" 
                    :item="{title:'Empty'}" />

                <TaskItemList
                    v-else 
                    v-for="(item, index) in items" 
                    :key="index" 
                    :item="item" 
                    @showDetails="showDetails"
                    @delete="deleteTask" 
                    @openUpdateModal="openUpdateModal"
                    />

            </div>

        </div>
    </div>
</template>
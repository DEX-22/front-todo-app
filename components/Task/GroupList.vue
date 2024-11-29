<script setup>
const props = defineProps({
    items: { type: Array },
    status: { type: String }
})

const title = computed(() => {
    return props.status.toUpperCase()
})
const items = computed(() => {
    return props.items || []
})
</script>

<template>
    <div class="  gap-3 justify-center  md:w-1/3 bg-slate-950 rounded-xl pb-4">
        <h2 class="text-xl font-bold w-full pl-4 py-2 bg-slate-950 rounded-t-xl">{{ title }}</h2>
        <div class="px-2 ">
            <div class="max-h-[50vh] w-full overflow-y-scroll   flex flex-col items-start">
                <TaskItemList v-if="!items.length" :key="0" :item="{title:'Empty'}" />

                <TaskItemList v-for="(item, index) in items" :key="index" :item="item" />

            </div>

        </div>
    </div>
</template>
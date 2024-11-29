<script setup> 
const {participants,item} = defineProps({ 
    item:{
        type: Object,
        required:true
    }
})



</script>
<template>  

    <div class="my-2 flex h-20 w-80 flex-row flex-nowrap rounded-xl  border-2 border-slate-600 bg-slate-700">
               
              <div class="flex h-full w-full items-center">
                <div class="grow px-2 py-3">
                  <div class="flex  ">
                    <h3 class="text-md" style="text-transform:initial;">{{ item.title }}</h3>
                    
                  </div>
                  <div class="flex  ">
                     
                  </div>
                </div>
                <div class="flex h-full w-16 items-center justify-center">
                  <div>2/4</div>
                </div>
            </div>
        </div>
</template>

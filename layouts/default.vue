<script setup>
import AuthService from '@/services/auth.service.ts'
const service = new AuthService()

function logout(){
    service.logout()
}
</script>
<template>
     <NuxtLoadingIndicator />
    <Navbar class="h-[10vh]">
        <template #logout>
            <button @click="logout" class="btn btn-sm btn-ghost"> logout</button>
        </template>
    </Navbar>
    <section  class="h-[90vh] py-2 px-4 overflow-y-scroll md:overflow-y-hidden"> 

        <slot />
    </section>
</template>
<style lang="postcss">
html{
    @apply h-screen overflow-y-hidden;
}
body{

    @apply bg-slate-700 h-screen ;
}

</style>
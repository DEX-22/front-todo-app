<template>
     <NuxtLoadingIndicator />
    <Navbar class="h-[10vh]">
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
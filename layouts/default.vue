<template>
     <NuxtLoadingIndicator />
    <Navbar >
        <template #action>
            <slot name="actionsNav" > 
            </slot> 
        </template>
    </Navbar>
    <section class="py-2 px-4"> 

    <slot />
</section>
</template>
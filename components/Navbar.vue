

<template>
    <div class="navbar bg-slate-950 drop-shadow-lg">
        <div class="flex-1">
            <h1 class="font-bold text-xl">TODO APP</h1>
        </div>
        <div class="flex-none">
            <slot name="logout" />
        </div>
    </div>
</template>
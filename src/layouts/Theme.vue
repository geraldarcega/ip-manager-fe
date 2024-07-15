<script setup lang="ts">
import PrimaryButton from '@/components/PrimaryButton.vue';
import { useUserStore } from '../store/user'

const userStore = useUserStore()
</script>

<template>
    <nav
        class="relative flex w-full flex-wrap items-center justify-between bg-zinc-50 py-2 shadow-dark-mild dark:bg-neutral-700 lg:py-4">
        <div class="flex w-full flex-wrap items-center justify-between px-3">
        <span class="ms-2 text-xl text-black dark:text-white">
            IP Address Manager
        </span>
        <div class="ms-5 flex w-[12%] items-center justify-between" v-show="userStore.isLoggedIn">
            <PrimaryButton class="ms-4" @click="userStore.logout()">
                Log out
            </PrimaryButton>
        </div>
        </div>
    </nav>
    <div class="min-h-screen flex flex-col lg:justify-center items-center pt-6 lg:pt-0 bg-gray-100">
        <div
            class="w-full md:max-w-xl mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg"
        >
            <slot />
        </div>
    </div>
</template>

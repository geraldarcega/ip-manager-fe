<script setup>
defineProps({
    message: {
        type: Array,
    },
});
</script>

<template>
    <div v-show="message">
        <ul>
            <li v-for="(item, index) in message">
                <p class="text-sm text-red-600">
                    {{ item }}
                </p>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import InputLabel from '@/components/InputLabel.vue'
import InputError from '@/components/InputError.vue'
import TextInput from '@/components/TextInput.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import { useUserStore } from '../store/user'
import router from '../router'

const userStore = useUserStore()
const form = ref({
  email: '',
  password: '',
  errors: {},
  processing: false
})
const handleLogin = () => {
  form.value.processing = true
  userStore.login(form.value.email, form.value.password).then(data => {
    if (data?.token) {
        router.push('/')
    }
    if (data?.response?.status === 422) {
        form.value.errors = data.response.data.errors
    }
  })
}
</script>

<template>
    <form @submit.prevent="handleLogin">
        <div>
            <InputLabel for="email" value="Email" />

            <TextInput
                id="email"
                type="email"
                class="mt-1 block w-full"
                v-model="form.email"
                required
                autofocus
                autocomplete="username"
            />

            <InputError class="mt-2" :message="form.errors?.email" />
        </div>

        <div class="mt-4">
            <InputLabel for="password" value="Password" />

            <TextInput
                id="password"
                type="password"
                class="mt-1 block w-full"
                v-model="form.password"
                required
                autocomplete="current-password"
            />

            <InputError class="mt-2" :message="form.errors?.password" />
        </div>

        <div class="flex items-center justify-end mt-4">
            <PrimaryButton class="ms-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                Log in
            </PrimaryButton>
        </div>
    </form>
</template>
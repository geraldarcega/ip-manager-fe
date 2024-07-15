<script setup>
import { useUserStore } from '@/store/user';
import { onMounted, ref, watch } from 'vue'
import InputLabel from '@/components/InputLabel.vue'
import InputError from '@/components/InputError.vue'
import TextInput from '@/components/TextInput.vue'
import axios from 'axios'
import router from '../router'
import { useRoute } from 'vue-router'

const route = useRoute()
const toUpdate = route.params.id
const userStore = useUserStore()
const $http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    withXSRFToken: true,
    headers: { Authorization: 'Bearer ' + userStore.accessToken }
});
const form = ref({
    ipAddress: '',
    label: '',
    errors: [],
    processing: false
})
onMounted(async () => {
    userStore.fetchUser()

    if (toUpdate) {
        $http.get("ip-addresses/" + toUpdate).then(res => {
            form.value.ipAddress = res.data.ip_address
            form.value.label = res.data.label
        }, err => {
            if (err?.response?.status === 404) {
                alert('IP address does not exists!')
                router.push('/')
            }
        })
    }
})

const handleSubmit = () => {
    form.value.processing = true
    if ( !toUpdate ) {
        $http.post("ip-addresses", {
            ip_address: form.value.ipAddress,
            label: form.value.label,
        }).then(res => {
            alert('IP address successfully created!')
            router.push('/')
        }, err => {
            if (err?.response?.status === 422) {
                form.value.errors = err.response.data.errors
            }
        })
    } else {
        $http.patch("ip-addresses/" + toUpdate, {
            label: form.value.label,
        }).then(res => {
            alert('IP address successfully updated!')
            router.push('/')
        }, err => {
            if (err?.response?.status === 422) {
                form.value.errors = err.response.data.errors
            }
        })
    }
}
</script>

<template>
    <form class="w-full max-w-lg" @submit.prevent="handleSubmit">
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <InputLabel for="ipAddress" value="IP Address" />
                <TextInput
                    id="ipAddress"
                    type="text"
                    class="mt-1 block w-full"
                    v-model="form.ipAddress"
                    required
                    autofocus
                    autocomplete="false"
                    readonly="{{!!toUpdate}}"
                />
                <InputError class="mt-2" :message="form.errors?.ipAddress" />
            </div>
            <div class="w-full md:w-1/2 px-3">
                <InputLabel for="label" value="Label" />
                <TextInput
                    id="label"
                    type="text"
                    class="mt-1 block w-full"
                    v-model="form.label"
                    autocomplete="false"
                />
            </div>
        </div>
        <div class="md:flex md:items-center">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2" type="submit">
                Create
            </button>
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" @click="router.push('/')">
                Cancel
            </button>
        </div>
    </form>
</template>
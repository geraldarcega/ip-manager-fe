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
const ipAddressID = route.params.id
const userStore = useUserStore()
const $http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    withXSRFToken: true,
    headers: { Authorization: 'Bearer ' + userStore.accessToken }
});
const ipAddressDetails = ref({
    ipAddress: '',
    label: '',
});
const audits = ref([])
onMounted(async () => {
    userStore.fetchUser()

    $http.get("ip-addresses/" + ipAddressID).then(res => {
        ipAddressDetails.value.ipAddress = res.data.ip_address
        ipAddressDetails.value.label = res.data.label
    }, err => {
        if (err?.response?.status === 404) {
            alert('IP address does not exists!')
            router.push('/')
        }
    })
    $http.get("ip-addresses/" + ipAddressID + "/audit-logs").then(res => {
        audits.value = res.data.data
    }, err => {
        if (err?.response?.status === 404) {
            alert('IP address does not exists!')
            router.push('/')
        }
    })
})
</script>

<template>
    <h2 class="text-4xl font-extrabold dark:text-white">{{ipAddressDetails.ipAddress}}</h2>
    <p class="my-4 text-lg text-gray-500">{{ipAddressDetails.label}}</p>
    <table class="min-w-full divide-y divide-gray-200">
        <thead>
            <tr>
                <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Action</th>
                <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Old Values</th>
                <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">New Values</th>
                <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Updated At</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
            <tr class="hover:bg-gray-100" v-for="audit in audits" :key="audit.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{{ audit.action }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{{ audit.old_values.label }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ audit.new_values.label }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ audit.new_values.updated_at }}</td>
            </tr>
            <tr>
                <td colspan="4" align="right">
                    <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" @click="router.push('/')">
                        Back
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>
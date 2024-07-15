<script setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '../store/user'
import axios from 'axios'
import router from '../router'

const userStore = useUserStore()
const $http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    withXSRFToken: true,
    headers: { Authorization: 'Bearer ' + userStore.accessToken }
});
const ipAddresses = ref([])

onMounted(async () => {
    userStore.fetchUser()
    $http.get("ip-addresses").then(res => {
        ipAddresses.value = res.data.data
    })
})
</script>
<template>
    <div class="flex flex-col">
  <div class="-m-1.5 overflow-x-auto">
    <div class="p-1.5 min-w-full inline-block align-middle">
      <div class="overflow-hidden">
        <div class="ms-5 flex w-[12%] items-center justify-between">
            <button type="button" class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" @click="router.push('/create')">
                Create
            </button>
        </div>
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">IP Address</th>
              <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Label</th>
              <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr class="hover:bg-gray-100" v-for="ipAddress in ipAddresses" :key="ipAddress.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{{ ipAddress.ip_address }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ ipAddress.label }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                <button type="button" class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none mr-3" @click="router.push('/update/' + ipAddress.id)">Update</button>
                <button type="button" class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none" @click="router.push('/audit-logs/' + ipAddress.id)">Logs</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</template>
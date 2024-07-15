import { defineStore } from "pinia"
import axios from 'axios';
import router from '../router'

const $http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    withXSRFToken: true
});

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {},
    token: null,
  }),

  getters: {
    currentUser: (state) => state.user,
    accessToken: (state) => state.token,
    isLoggedIn: (state) => !!state.token,
  },

  actions: {
    async fetchUser() {
      try {
        const header = { headers: { Authorization: 'Bearer ' + this.token } }
        const res = await $http.get("user", header)
        this.user = res.data

        return res.data
      } catch (err) {
        if (err.response.status === 401) {
            this.user = null
            this.token = null
            router.push('/login')
        } else {
            alert('Oops! Something went wrong, please try again later.')
            console.log(err.response);
        }
      }
    },

    async login(email, password) {
      try {
        const res = await $http.post("login", {
            email: email,
            password: password,
        })
        this.user = res.data.user
        this.token = res.data.token

        return res.data
      } catch(err) {
          return err
      }
    },

    async logout() {
      try {
        const header = { headers: { Authorization: 'Bearer ' + this.token } }
        const res = await $http.post("logout", [], header)

        if (res.status === 204) {
            this.user = null
            this.token = null
            router.push('/login')
        }
      } catch (err) {
        console.log(err);
        alert('Oops! Something went wrong.')
      }
    },
  },
  persist: true
})

import './bootstrap';
import '../sass/app.scss'
import '../css/app.css'
import Router from '@/router'
import store from '@/store'
import axios from 'axios'
import LaravelVuePagination from 'laravel-vue-pagination'

import { createApp } from 'vue/dist/vue.esm-bundler'

const app = createApp({})
app.config.globalProperties.$axios = axios
app.use('pagination', LaravelVuePagination)
app.use(Router)
app.use(store)
app.mount('#app')
import { createWebHistory, createRouter } from 'vue-router'
import store from '@/store'

/* Guest Component */
const Login = () => import('@/components/Login.vue')
const Register = () => import('@/components/Register.vue')
/* Guest Component */

/* Layouts */
const DashboardLayout = () => import('@/components/layouts/Default.vue')
/* Layouts */

/* Authenticated Component */
const Dashboard = () => import('@/views/Dashboard/Dashboard.vue')
const Books = () => import('@/views/Book/Books.vue')
const AddBook = () => import('@/views/Book/AddBook.vue')
const EditBook = () => import('@/views/Book/EditBook.vue')
const Barrows = () => import('@/views/Barrow/Barrows.vue')
const Genres = () => import('@/views/Genre/Genres.vue')
const AddGenre = () => import('@/views/Genre/AddGenre.vue')
const EditGenre = () => import('@/views/Genre/EditGenre.vue')
/* Authenticated Component */


const routes = [
    {
        name: "login",
        path: "/login",
        component: Login,
        meta: {
            middleware: "guest",
            title: `Login`
        }
    },
    {
        name: "register",
        path: "/register",
        component: Register,
        meta: {
            middleware: "guest",
            title: `Register`
        }
    },
    {
        path: "/",
        component: DashboardLayout,
        meta: {
            middleware: ["auth",'admin','lender']
        },
        children: [
            {
                name: "dashboard",
                path: '/',
                component: Dashboard,
                meta: {
                    title: `Dashboard`
                }
            },
            {
                name: "books",
                path: '/',
                component: Books,
                meta: {
                    title: `Books`
                }
            },
            {
                name: "addbook",
                path: '/books/add',
                component: AddBook,
                meta: {
                    middleware: "admin",
                    title: `Add Book`
                }
            },
            {
                name: "editbook",
                path: '/books/edit/:id',
                component: EditBook,
                meta: {
                    middleware: "admin",
                    title: `Edit Book`
                }
            },
            {
                name: "barrows",
                path: '/',
                component: Barrows,
                meta: {
                    title: `Barrows`
                }
            },
            {
                name: "genres",
                path: '/',
                component: Genres,
                meta: {
                    middleware: "admin",
                    title: `Genres`
                }
            },
            {
                name: "addgenre",
                path: '/genres/add',
                component: AddGenre,
                meta: {
                    middleware: "admin",
                    title: `Add Genres`
                }
            },
            {
                name: "editgenre",
                path: '/genres/edit/:id',
                component: EditGenre,
                meta: {
                    middleware: "admin",
                    title: `Edit Genre`
                }
            },
            
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;

    if (to.meta.middleware == "guest") {
        if (store.state.auth.authenticated) {
            next({ name: "dashboard" })
        }
        next()
    } else {
        if (store.state.auth.authenticated) {
            if(to.meta.middleware.includes(store.state.auth.user.user_type)){
                next()
            }else{
                next({ name: "dashboard" })
            }
        } else {
            next({ name: "login" })
        }
    }
})

export default router
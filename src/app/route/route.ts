import { Router } from "express"
import { userRoutes } from "../modules/user/userRoutes"
import { authRoutes } from "../modules/auth/authRoutes"
import { productRoutes } from "../modules/product/productRoutes"

const router = Router()
const routes = [
    {
        path: "/user",
        component: userRoutes
    },
    {
        path: "/auth",
        component: authRoutes
    },
    {
        path: "/product",
        component: productRoutes
    }
]


routes.forEach(route => router.use(route.path, route.component))
export default router
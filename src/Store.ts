import { configureStore } from '@reduxjs/toolkit'
import TreeSlice from './features/TreeSlice'
import RoleSlice from './features/RoleSlice'
import sinup from './features/SinUpSlice'
export const Store = configureStore({
    reducer: {
        Tree: TreeSlice,
        Roles: RoleSlice,
        LoggedIn: sinup
    }
})
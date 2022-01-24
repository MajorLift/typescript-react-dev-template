import { configureStore } from '@reduxjs/toolkit'
import { createHashHistory } from 'history'
import rootReducer from '../reducers/rootReducer'

export const history = createHashHistory()

const store = configureStore({
  reducer: rootReducer(),
})

export default store

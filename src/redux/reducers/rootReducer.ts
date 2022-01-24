import { combineReducers, Reducer } from 'redux'
import counterReducer from '../components/counter/counterSlice'
import complexReducer from '../components/complex/complexSlice'

const rootReducer = (): Reducer => {
  return combineReducers({
    counter: counterReducer,
    complex: complexReducer,
  })
}
export default rootReducer

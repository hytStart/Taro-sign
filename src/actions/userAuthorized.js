import { TEST } from '@constants/userAuthorized.js'

export const testActions = () => {
    return {
      type: TEST
    }
}


// 异步的action
// export function asyncAdd () {
//   return dispatch => {
//     setTimeout(() => {
//       dispatch(add())
//     }, 2000)
//   }
// }

/**
 * 공통 API SERVER axios
 * JWT 관련 서버 응답값
 * 400
 * 401
 * 402
 * 403
 */

import axios from 'axios'
import router from '@/routes'
import useStore from '@/stores/store'

const { updateTheme, getTheme } = useStore()

const service = axios.create({
  baseURL: process.env.VUE_APP_AUTH_HOST,
  withCredentials: true,
  timeout: 3000,
})

/* axios 인터셉터 처리 [요청] */
service.interceptors.request.use((config) => {
  // TODO :: Global Loading true

  // TODO :: Token 가져오기

  // TODO :: Token headers 주입

  return config
},
(error) => {
  return Promise.reject(error)
})

/* axios 인터셉터 처리 [응답] */
service.interceptors.response.use(async (response) => {
  // TODO :: Global Loading true

  // TODO :: response.data
  const rs = response.data

  // TODO :: response.state 에 따른 분기
}, (error) => {
  // TODO :: Global Loading true

  // TODO :: response.error 분기
})


export default service

export const fetchApi = (options, useAuth = true) => {
  return service(options);
}

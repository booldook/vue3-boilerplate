/**
 * 공통 API SERVER axios 서비스
 *
 * JWT 관련 서버 응답값
 * 401 sys.error.003 : AccessToken 인증만료
 * 401 sys.error.004 : JWT Token 오류
 * 401 sys.error.005 : JWT 헤더없음
 * 401 sys.error.006 : RefreshToken 인증만료
 * 400 sys.error.008 : Refresh Token 오류
 */

import axios from 'axios'
import router from '@/routes'

//% store 가져오기
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/userStore'
const userStore = useUserStore()
const { getUser } = storeToRefs(userStore)
const { updateUser } = userStore

/* 세션만료 에러코드 체크함수 */
function chkCd(code) {
  if (code === 401) {
    if (!store.state.userAuth.loginToken.refreshToken) {
      // 리프레시 토큰이 없으면 로그아웃한다
      store.commit('userAuth/removeUserSession')
      return false
    }
    return true
  }
  return false
}

const service = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 60000, // request timeout time ms
})

/* axios 인터셉터 처리 [요청] */
service.interceptors.request.use(
  (config) => {
    NativeUtil.addLog('service.interceptors.request : ' + JSON.stringify(config))
    configSet = config
    return config
  },
  (error) => {
    console.error('service.interceptors.request.use', error) // for debug
    return Promise.reject(error)
  },
)

/* axios 인터셉터 처리 [응답] */
service.interceptors.response.use(
  async function (response) {
    const res = response.data

    try {
      /* 상태값에 따른 에러처리 해보기 */
      if (response.status !== 200 || (response.request.responseType.toUpperCase() !== 'BLOB' && response.data.status !== 'OK')) {
        res.success = false
      }
      else {
        res.success = true
      }
      if (!res.success) {
        if (chkCd(res.status)) {
          const tmpConfig = configSet
          const infoRes = await getRefreshToken(store.state.userAuth.loginToken.refreshToken)
          await store.commit('userAuth/' + loginToken, infoRes)
          tmpConfig.headers['JWT'] = infoRes.jwt
          return await fetchData(tmpConfig)
        }

        return Promise.reject(new Error(res.message || 'Error'))
      }

      if (response.request.responseType.toUpperCase() === 'BLOB') {
        return res
      }
      else {
        return res.data
      }
    }
    catch (e) {

      NativeUtil.addLog('service.api use: ' + e.message)
      NativeUtil.addLog('service.api use stack: ' + e.stack)
      loadingClose()
      return Promise.reject(new Error(res.message || 'Error'))
    }
  },
  async function (error) {

    let message = '오류가 발생했습니다. 관리자에게 문의하여 주시기 바랍니다.'
    const response = error.response || {}
    const { status, config } = response
    let data
    try {
      if (response.data) {
        if (response.data.data) {
          data = response.data.data
        }
        else {
          data = response.data
        }
      }
    }
    catch (e) {
      data = response.data
    }
    try {
      /* 세션연장처리 */
      if (!CommonUtil.isEmpty(error) && !CommonUtil.isEmpty(error.response) && chkCd(error.response.status) && configSet.url !== 'ccmn/v1/auth/refresh') {
        const tmpConfig = configSet
        const infoRes = await getRefreshToken(store.state.userAuth.loginToken.refreshToken)

        // null check
        if (CommonUtil.isEmpty(infoRes)) return

        await store.commit('userAuth/' + loginToken, infoRes)
        tmpConfig.headers['JWT'] = infoRes.jwt
        return await fetchData(tmpConfig)
      }
      else {

        console.log('에러메세지생성', error)
        message = CommonUtil.isEmpty(error) || CommonUtil.isEmpty(error.response) || CommonUtil.isEmpty(error.response.data) || CommonUtil.isEmpty(error.response.data.message) ? '오류가 발생했습니다. 관리자에게 문의하여 주시기 바랍니다.' : error.response.data.message

        if (configSet.url == 'ccmn/v1/auth/refresh') {
          await $alert('토큰 시간이 만료되어 로그인 화면으로 이동합니다.')
          store.commit('userAuth/removeUserSession')
          router.replace('/login')
        }
      }
    }
    catch (e) {
      message = e
      console.log(e)
      loadingClose()
    }

    // 에러_메세지(http 로그인 인증 jwt 401)
    // WRONG_TYPE_TOKEN    잘못된 토큰
    // EXPIRED_TOKEN       인증 만료
    // UNSUPPORTED_TOKEN   잘못된 토큰
    // WRONG_TOKEN         잘못된 토큰
    // UNKNOWN_ERROR 		정의되지 않은 오류
    // NO_TOKEN			로그인 하지 않음 토큰 없음
    if (!CommonUtil.isEmpty(error) && !CommonUtil.isEmpty(error.response) && !CommonUtil.isEmpty(error.response.status) && !fetchDataErrorCodes.includes(error.response.status)
      && !fetchDataErrorCodes.includes(401)) {

      // 토큰관련 에러문구 치환
      if (message === 'WRONG_TYPE_TOKEN') {
        // message = '';

      }
      else if (message === 'EXPIRED_TOKEN') {
        message = '시간이 경과되어 보안의 사유로 자동으로 화면보호를 하였습니다.\n\r로그인을 하기 위해서는 패스워드를 다시 입력하셔야 합니다'

      }
      else if (message === 'UNSUPPORTED_TOKEN') {
        // message = '';

      }
      else if (message === 'WRONG_TOKEN') {
        // message = '';

      }
      else if (message === 'UNKNOWN_ERROR') {
        // message = '';

      }
      else if (message === 'NO_TOKEN') {
        // message = '';
      }

      //로그인의 경우 에러메시지 무조건 공통으로 처리
      if (error.response.status == 400 && configSet.url == 'ccmn/v1/mob/auth/login') {
        message = '아이디 또는 패스워드가 틀렸습니다.'
      }

      //아이디 찾기의 경우 에러메시지 무조건 공통으로 처리
      if ((error.response.status == 400 || error.response.status == 403) && configSet.url == 'ccmn/v1/mob/auth/password') {
        message = '아이디 또는 이메일이 존재하지 않습니다.'
      }

      // fetchDataError = true
      fetchDataErrorCodes.push(error.response.status)
      await $alert(message)
      fetchDataErrorCodes = [] // fetchDataError = false
    }
    else {

      await $alert(message)
    }

    loadingClose()
    return Promise.reject(data)
  },
)

export default service

/**
 * fetchData
 * @param {object} options axios options
 * @param {boolean} options.isFormData multipart/form-data 처리시
 * @param {boolean} useJWT jwt header 설정 여부 (기본값 true)
 * @returns {Promise}
 */
export const fetchData = (options, useJWT = true) => {
  if (options.isFormData) {
    const headers = options['headers'] || {}
    headers['Content-type'] = 'multipart/form-data'
    options['headers'] = headers
  }
  if (useJWT && store.state.userAuth.loginToken.accessToken) {
    const headers = options['headers'] || {}
    headers['JWT'] = store.state.userAuth.loginToken.accessToken
    options['headers'] = headers
  }
  if (useJWT && options.responseType === 'blob') {
    const headers = options['headers'] || {}
    headers['JWT'] = store.state.userAuth.loginToken.accessToken
    headers['Content-Type'] = 'application/json;charset=UTF-8'
    options['headers'] = headers
    options['responseType'] = options.responseType
  }
  return service(options)
}


/**
 * 리프레시 토큰을 통한 엑세스 토큰 재발급
 * @param {string} refreshToken
 * @returns {Promise}
 */
const getRefreshToken = async (token) => {
  const formData = new FormData()
  formData.append('refresh', token)

  const res = await fetchData({
    url: 'ccmn/v1/auth/refresh',
    method: 'POST',
    data: formData,
    isFormData: true,
  }, false)

  return res
}

/**
 * eksys 서버 네이티브 HTTP 통신
 * @param options
 * @returns {Promise<unknown>}
 */
export const fetchEksys = (options) => {
  if (!isMorpheus()) return
  const _options = {
    url: options.url || '',
    method: options.method || 'POST',
    param: options.param || {},
    headers: options.headers,
  }
  console.log(_options)
  return new Promise((resolve, reject) => {
    M.net.http.send({
      server: 'API_GATEWAY',
      path: _options.url,
      method: _options.method,
      timeout: 30000,
      userData: {
        Authorization: _options.headers,
      },
      indicator: {
        show: false,
        message: 'Loading..',
        cancelable: true,
      },
      data: _options.param,
      success: function (recevedData, setting) {
        resolve(recevedData) // data 바로 출력됨
      },
      error: function (errorCode, errorMessage, setting) {
        reject(errorCode, errorMessage)
      },
    })
  })
}

/**
 * 로그인화면으로 이동전에 기존에 로딩을 강제숨김 처리
 */
const loadingClose = () => {
  try {
    router.app.$loading().close()
  }
  catch (e) {
    console.error('router.app.$loading()', e)
    NativeUtil.addLog('router.app.$loading(): ' + e.message)
  }
}

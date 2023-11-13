// import 'element-plus/es/components/loading/style/css'

//# 로딩바 관련 변수 - Full Loading
// let loadingCnt = 0
// let loading = null


//# 로딩바 보이기
// const openFullLoading = () => {
//   if (loadingCnt < 1) loading = ElLoading.service(Define.LOADING_OPTION_TRANSPARENT)
//   loadingCnt++
// }

//# 로딩바 가리기
// const closeFullLoading = () => {
//   loadingCnt = 0
//   setTimeout(() => {
//     loading?.close()
//   }, 300)
// }

// TODO :: 로딩바 Store로 옮기기 - 2023-11-13
// TODO :: 예외처리 공통코드화 - 2023-11-13

/**
 * ? Client IP 가져오기 (Cloud용)
 * @returns {Promise<*|string>}
 */
const getIpData = async () => {
  try {
    const response = await axios.get("https://api64.ipify.org?format=json")
    // console.log(response.data.ip)
    return response?.data?.ip || "0.0.0.0"
  }
  catch (error) {
    console.log(error)
  }
}


/**
 * ? URL 생성 함수
 * @param {object} config
 * @param {string} api
 * @return {object} config
 */
const setURL = async (config, api = "") => {
  if (config?.url) {
    if (api.toUpperCase() === "AUTH" || api.toUpperCase() === "API") {
      const regExp = new RegExp(/^\/test/)
      if (!regExp.test(config?.url)) {
        config.url =
          (api.toUpperCase() === "AUTH" ? import.meta.env.VITE_API_AUTH : import.meta.env.VITE_API_API) + config.url
        console.log(config.url)
      }
      config.headers["Client-Ip"] = await getIpData()
      console.log("%c ===== import.meta =====", "background: #222; color: #ea6947")
      console.log("api.toUpperCase() === ", api.toUpperCase())
      console.log("VITE_API_AUTH === ", import.meta.env.VITE_API_AUTH)
      console.log("VITE_API_API === ", import.meta.env.VITE_API_API)
      console.log(config.url)
    }
  }

  return config
}


/**
 * ? 오류메세지 공통 경고창 - catch Error :: MessageBox
 * @param {object} error  // ['BLOB', 'FILE', 'FORM', '']
 * @param {string} place  // ['loginService_REQUEST', 'loginService_RESPONSE', 'apiService_REQUEST', 'apiService_RESPONSE']
 * @param {string} type   // ['CODE', '']
 * @param {string} loc    // [router path]
 */
const alertError = (error, place = "", type = "", loc = null) => {
  console.log("%c " + place + " :: Error :: " + type + " ", "background: #222; color: #ea6947", error)
  const errorCode = error?.response?.data?.errorCode || error?.response?.data?.code
  if (type !== "AISB00083") {
    let msg = ""
    // msg += import.meta.env.MODE === 'development' ? `<p>${ error.code }</p>` : ''
    // msg += import.meta.env.MODE === 'development' ? `<p>${ error.message }</p>` : ''
    // msg += error.response.data ?.['code'] && import.meta.env.MODE === 'development' ? `<p>${ error.response.data.code }</p>` : ''
    msg += error?.response?.data?.["message"] ? error?.response?.data.message : "오류가 발생했습니다."
    if (errorCode === "sys.error.003") msg = "업로드 해상도 불일치, 업로드파일 삭제후 재 업로드"
    if (errorCode === "cms.error.003") msg = "이미 확정된 스케줄 입니다."
    if (errorCode === "login.error.003") msg = "입력하신 아이디/비밀번호가 확인되지 않습니다.<br> 담당자에게 문의하세요"

    if (errorCode === "IDSB00021") msg = "입력하신 아이디/비밀번호가 확인되지 않습니다. 다시 확인해주세요"
    ElMessageBox.alert(msg, "Error", {
      dangerouslyUseHTMLString: true,
      callback: (action) => {
        if (loc) router.push({ name: loc })
      },
    })
  }
}


/**
 * ? 성공메세지 공통 console.log
 * @param {object} rs
 * @param {string} place ['loginService', 'apiService']
 */
const alertSuccess = (rs, place) => {
  console.log("%c " + place + " :: SUCCESS :: ", "background: #ffd2d2; color: #111", rs)
}


/**
 * ? Content-Type 생성 함수 -> headers Content-Type :: axios Base Options
 * @param {object} options ['BLOB', 'FILE', 'FORM', '']
 * @return {object} options
 */
const setContentType = (options) => {
  if (!options.headers) options.headers = {}
  if (!options.headers["Content-Type"]) {
    const contentType = (options.contentType || "").toUpperCase()
    switch (contentType) {
      case "FORM":
        options.headers["Content-Type"] = "application/x-www-form-urlencoded"
        break
      case "FILE":
        options.headers["Content-Type"] = "multipart/form-data"
        break
      case "BLOB":
        options.headers["Content-Type"] = "application/json;charset=UTF-8"
        break
      default:
        options.headers["Content-Type"] = "application/json"
        break
    }
  }
  options.originalUrl = options.url
  return options
}


/**
 * ? Basic Auth 사용여부 - 최초 Login 에서만 사용
 * @param {boolean} _useBasic [true|false :: BasicAuth 사용여부]
 * @return {object} options
 */
const setBaseOptions = (_useBasic) => {
  const options = {
    // withCredentials: false,
    withCredentials: false,
    timeout: import.meta.env.VITE_API_TIMEOUT,
  }
  if (_useBasic) {
    options.auth = {
      username: import.meta.env.VITE_BASIC_USER,
      password: import.meta.env.VITE_BASIC_PASS,
    }
  }
  return options
}




//! axios login(oauth) service
const loginService = axios.create({ ...setBaseOptions(false) })

//! axios api(Backend) service
const apiService = axios.create({ ...setBaseOptions(false) })

//! /login 인터셉터 처리 [요청]
loginService.interceptors.request.use(
  async (config) => {
    // openFullLoading()
    return setURL(config, "AUTH")
  },
  async (error) => {
    // closeFullLoading()
    alertError(error, (error?.config?.requestType || "Login") + " :: Request")
    return Promise.reject(null)
  },
)

//! /login 인터셉터 처리 [응답]
loginService.interceptors.response.use(
  async (response) => {
    // closeFullLoading()
    const { data: rs, status, config } = response
    if (rs && status === 200 && $isEmpty(rs.error)) {
      const { updateUser } = useStore()
      updateUser(rs)
      alertSuccess(rs, (config?.requestType || "Login") + " :: Response 200")
      return rs
    }
    else {
      alertError(response, (config?.requestType || "Login Server") + " :: Response 200", "")
      return null
    }
  },
  async (_error) => {
    // _error ****************
    // code:"ERR_BAD_REQUEST"
    // config:{transitional: {…}, adapter: Array(2), transformRequest: Array(1), transformResponse: Array(1), timeout: '3000', …}
    // message:"Request failed with status code 401"
    // name:"AxiosError"
    // request:XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 3000, withCredentials: true, upload: XMLHttpRequestUpload, …}
    // response:{data: {…}, status: 401, statusText: '', headers: AxiosHeaders, config: {…}, …}
    // stack:"AxiosError: Request failed with status code 401\n    at settle (http://localhost:5173/node_modules/.vite/deps/axios.js?v=6f9ec799:1166:1

    // _error.response *************
    // config: {transitional: {…}, adapter: Array(2), transformRequest: Array(1), transformResponse: Array(1), timeout: '3000', …}
    // data: {code: 'IDSB00025', message: '알수 없는 오류', data: null}
    // headers: AxiosHeaders {cache-control: 'no-cache, no-store, max-age=0, must-revalidate', content-type: 'application/json', expires: '0', pragma: 'no-cache'}
    // request: XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 3000, withCredentials: true, upload: XMLHttpRequestUpload, …}
    // status: 401
    // statusText: ""

    // _error.response.data.code *************
    // IDSB00021=잘못된 로그인 - 아이디/패스워드 틀림
    // IDSB00022=필수 필드 없음(grant_type)
    // IDSB00023=필수 필드 없음(password)
    // IDSB00024=필수 필드 없음(username)
    // IDSB00025=알수 없는 오류
    // IDSB00026=정확하지 않은 인증 정보(ID, PW)
    // IDSB00027=정확하지 않은 인증 정보(ID, PW)
    // IDSB00028=Refresh 토큰 만료
    // IDSB00029=필수 필드 값이 유효하지 않음(grant_type)
    // IDSB00030=canvas 정보가 올바르지 않음
    // IDSB00031=Access 토큰 만료
    // IDSB00032=리소스 아이디가 다름
    // IDSB00033=정상적인 토큰이 아님
    // IDSB00034=토큰이 존재하지 않음
    // IDSB00035=권한 오류

    const { response, config } = _error

    // Login RETRY 반복 요청
    if (config) {
      if (config?.retry > (import.meta.env?.VITE_API_RETRY || 1)) {
        // closeFullLoading()
        const { logoutUser } = useStore()
        logoutUser()
        alertError(_error, (config?.requestType || "Login") + " :: Response", response?.code)
        return null
      }
      else {
        // retry
        setTimeout(async () => {
          config.retry = config?.retry && typeof config.retry === "number" ? config.retry + 1 : 1
          config.url = config?.originalUrl
          const rs = await $fetchLogin(config)
        }, 1000)
      }
    }
  },
)

//! /api 인터셉터 처리 [요청]
apiService.interceptors.request.use(
  async (config) => {
    // openFullLoading()
    const { getAccessToken, logoutUser } = useStore()
    if (getAccessToken?.value) {
      config.headers.Authorization = "Bearer " + getAccessToken?.value
      return setURL(config, config?.apiType || "API")
    }
    else {
      logoutUser()
      return false
    }
    // Token 없을때 반복 함수
    // return setURL(config, config?.apiType || 'API')
    //
    // const { getAccessToken, logoutUser } = useStore()
    // if (getAccessToken?.value) {
    //   config.headers.Authorization = 'Bearer ' + getAccessToken.value
    //   return setURL(config, config?.apiType || 'API')
    // }
    // else {
    //   logoutUser()
    //   return false
    // }
  },
  async (error) => {
    // closeFullLoading()
    alertError(error, (error?.config?.requestType || "API") + " :: Request")
    return Promise.reject(null)
  },
)

//! /api 인터셉터 처리 [응답]
apiService.interceptors.response.use(
  async (response) => {
    // closeFullLoading()
    const { data: rs, config, status } = response
    const { code, error, message, data } = rs || {}

    if (status === 200 && $isEmpty(error)) {
      alertSuccess(data, (config?.requestType || "API") + " :: Response 200")
      return rs
    }
    else {
      alertError(response, (config?.requestType || "API Server") + " :: Response 200", error)
      return null
    }
  },
  async (_error) => {
    const { config, response } = _error
    const { error = null, code = "", message = "" } = response?.data || {}

    switch (error) {
      case "AIStudioT00001":
      case "AISB00083":
        const { getRefreshToken } = useStore()
        if (getRefreshToken?.value) {
          const formData = new FormData()
          formData.append("grant_type", "refresh_token")
          formData.append("refresh_token", getRefreshToken.value)
          const rs = await $fetchLogin({
            url: "/oauth/token",
            method: "post",
            contentType: "FORM",
            data: formData,
            requestType: "Refresh",
          })
          if (rs) {
            //! 토큰 Store access_token, refresh_token 갱신
            const { updateUser } = useStore()
            updateUser(rs)

            //! access_token 갱신 후 Api 재요청
            config.headers.Authorization = "Bearer " + (rs?.access_token || "")
            config.url = config?.originalUrl
            return (await $fetchApi(config)) || null
          }
        }
        break
      default:
        break
    }

    // Api RETRY 반복 요청
    // if (config && config?.originalUrl !== '/api/healthcheck') {
    //   if (config?.retry > 1) {
    //     closeFullLoading()
    //     alertError(_error, (config?.requestType || 'API') + ' :: Response', error)
    //     return null
    //   }
    //   else {
    //     // retry
    //     setTimeout(async () => {
    //       config.retry = config?.retry ? config.retry + 1 : 1
    //       config.url = config?.originalUrl
    //       const rs = await $fetchApi(config)
    //     }, 1000)
    //   }
    // }
    // else {
    //   closeFullLoading()
    //   return null
    // }

    // closeFullLoading()
    alertError(_error, (config?.requestType || "API") + " :: Response", error)
    return null
  },
)

//! Axios Wrapper - /api
export const $fetchApi = (options) => apiService(setContentType(options))

//! Axios Wrapper - /oauth
export const $fetchLogin = (options) => loginService(setContentType(options))

//! Axios Original
export const $axios = axios

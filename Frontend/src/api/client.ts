import { getAccessToken, removeAccessToken, saveAccessToken, saveLoginInfo } from '@/hooks';
import { LandingPageErrors } from '@/types';
import { LoginInfo } from '@/types/loginInfo';
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_BACKEND + 'ontheblock/api'
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';

//const navigate = useNavigate();

const readAccessToken = () => {
    const accessToken = getAccessToken()
    return accessToken ? accessToken : null
}

// To-Do: any 타입 대체하기.
const success = (response: any) => {return response}
const failure = async (error: any) => {
    // if access token is NOT valid
    if (error.response?.status === 401) {
      const config = error.config
      if (config === undefined) return
      // send refresh token in header to get new one
      //return await axios.get("jwt/reissue", {headers:{"refreshToken": readRefreshToken()}})
      return await axios.get("jwt/reissue")
        // if refresh token is valid
        .then(async (response) => {
          // save new tokens
          saveAccessToken(response.data.accessToken)
          //saveRefreshToken(response.data.refreshToken)
          // do original work
          config.headers["accessToken"] = readAccessToken()
          return await axios(config)
        })
        
        .catch((error) => {
          /* 로그인 정보 만료 시, 또는 비로그인 상태에서 경로 접근 */
          
          removeAccessToken()
          
          const state = { error: LandingPageErrors.unauthorized }
          
          /* 히스토리에 상태와 함께 경로를 지정. 중간 매개변수는 사용되지 않는 'title' */
          window.history.pushState(state, '', '/')

          // 이벤트 발생을 애플리케이션에 알림.
          const navEvent = new PopStateEvent('popstate', { state })
          window.dispatchEvent(navEvent)

          //To-Do: Landing.tsx가 전달받은 error에 접근하지 못함.

          return Promise.reject(error)
        })
    } else {
      return Promise.reject(error)
    }
}
  
export const client = () => {
  const instance =  axios.create();
  instance.interceptors.response.use(success, failure)
  return instance
}
  

export const clientWithToken = () => {
  const instance = axios.create({
    headers: {
      "Content-type": 'application/json; charset=UTF-8',
      "accessToken": readAccessToken(),
    }
  })
  instance.interceptors.response.use(success, failure)
  return instance
}


export const clientWithTokenAndMedia = () => {
  const instance = axios.create({
    headers: {
      "accessToken": readAccessToken(),
    },
  });
  instance.interceptors.response.use(success, failure);
  return instance;
};
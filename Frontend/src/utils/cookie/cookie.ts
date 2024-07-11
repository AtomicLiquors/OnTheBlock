
export const deleteCookie = (cookieName: string) => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

export const parseCookie = (cookieString: string) => {
    //To-Do : cookieString 형식이 맞는지 검증하고 아니면 에러처리?
    const cookieMap = new Map();
    cookieString.split(';').map((cookie) => {
      const [name, value] = cookie.trim().split('=');
      cookieMap.set(name, value.trim());
    });

    //To-Do : cookie에서 유효한 값을 찾지 못한 경우 에러처리.
    const accessToken = cookieMap.get('accessToken');
    //const refreshToken = cookieMap.get('refreshToken');
    const memberId = cookieMap.get('memberId');
    
    return [accessToken, memberId];
  }
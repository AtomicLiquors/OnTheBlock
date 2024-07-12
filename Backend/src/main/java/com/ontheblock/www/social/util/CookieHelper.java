package com.ontheblock.www.social.util;
import jakarta.servlet.http.Cookie;
import org.springframework.stereotype.Component;

@Component
public class CookieHelper {
    public Cookie[] createTokenInfoCookies(String accessToken, String refreshToken, String memberId){
        Cookie[] cookies = new Cookie[3];
        cookies[0] = createCookie("accessToken", accessToken, false, false);
        cookies[1] = createCookie("refreshToken", refreshToken, true, true);
        cookies[2] = createCookie("memberId", memberId, false, false);

        return cookies;
    }
    private Cookie createCookie(String key, String value, boolean isHttpOnly, boolean isSecure){
        Cookie cookie = new Cookie(key, value);
        cookie.setHttpOnly(isHttpOnly);
        cookie.setSecure(isSecure);
        cookie.setMaxAge(3600); // 쿠키 유효 시간 설정 (예: 1시간)
        cookie.setPath("/");

        return cookie;
    }


}

package com.ontheblock.www.social.util;
import jakarta.servlet.http.Cookie;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

@Component
public class SocialHelper {


    @Value("${front.scheme}")
    private String frontScheme;
    @Value("${front.host}")
    private String frontHost;
    public Cookie createTokenInfoCookie(String key, String value){
        Cookie cookie = new Cookie(key, value);
        cookie.setHttpOnly(false);
        cookie.setMaxAge(3600); // 쿠키 유효 시간 설정 (예: 1시간)
        cookie.setPath("/");

        return cookie;
    }

    public String getFrontURI(boolean isNewMember, String nickName) {
        return UriComponentsBuilder.newInstance()
                .scheme(frontScheme)
                .host(frontHost)
                .path("/bridge")
                .queryParam("isNewMember", isNewMember)
                .queryParam("nickName",nickName)
                .build()
                .toString();
    }

}

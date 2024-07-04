package com.ontheblock.www.social.util;
import jakarta.servlet.http.Cookie;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Component;

@Component
public class SocialHelper {
    // 사용 보류, 미사용시 삭제 요망.
    public String createTokenInfoJson(String accessToken, String refreshToken, Long memberId){
        JSONObject json = new JSONObject();
        json.put("accessToken", accessToken);
        json.put("refreshToken", refreshToken);
        json.put("memberId", memberId);

        return json.toJSONString();
    }
    public Cookie createTokenInfoCookie(String accessToken, String refreshToken, Long memberId){
        String json = createTokenInfoJson(accessToken, refreshToken, memberId);
        return createTokenInfoCookie(json);
    }
    public Cookie createTokenInfoCookie(String tokenInfo){
        Cookie cookie = new Cookie("tokenInfo", tokenInfo);
        cookie.setHttpOnly(false);
        cookie.setMaxAge(3600); // 쿠키 유효 시간 설정 (예: 1시간)
        cookie.setPath("/");

        return cookie;
    }
}

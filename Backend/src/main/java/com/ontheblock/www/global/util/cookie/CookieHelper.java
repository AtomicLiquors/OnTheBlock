package com.ontheblock.www.global.util.cookie;
import jakarta.servlet.http.Cookie;
import org.springframework.stereotype.Component;

@Component
public class CookieHelper {
    public Cookie[] createTokenInfoCookies(String accessToken, String refreshToken, String memberId){
        Cookie[] cookies = new Cookie[3];

        Cookie accessTokenCookie =
                new CookieBuilder.Builder("accessToken", accessToken).build();

        Cookie refreshTokenCookie =
                new CookieBuilder.Builder("refreshToken", refreshToken)
                        .httpOnly(true)
                        .secure(true)
                        .build();

        Cookie memberIdTokenCookie =
                new CookieBuilder.Builder("memberId", memberId).build();

        cookies[0] = accessTokenCookie;
        cookies[1] = refreshTokenCookie;
        cookies[2] = memberIdTokenCookie;

        return cookies;
    }
}

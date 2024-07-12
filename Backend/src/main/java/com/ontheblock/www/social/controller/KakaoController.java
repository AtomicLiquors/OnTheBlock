package com.ontheblock.www.social.controller;


import com.ontheblock.www.JWT.service.JwtService;
import com.ontheblock.www.global.util.FrontURIHelper;
import com.ontheblock.www.member.service.MemberService;
import com.ontheblock.www.social.domain.kakao.KakaoClient;
import com.ontheblock.www.social.domain.kakao.KakaoProfile;
import com.ontheblock.www.social.dto.response.LoginMemberResponse;
import com.ontheblock.www.social.service.SocialService;
import com.ontheblock.www.global.util.cookie.CookieHelper;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RequestMapping("/kakao")
@RestController
@RequiredArgsConstructor
public class KakaoController {
    private final KakaoClient kakaoClient;
    private final SocialService socialService;
    private final JwtService jwtService;
    private final MemberService memberService;
    private final CookieHelper cookieHelper;
    private final FrontURIHelper frontURIHelper;

    @GetMapping("/login")
    public void getKakaoAuthUrl(HttpServletResponse httpServletResponse) throws Exception{
        kakaoClient.getAuthCode(httpServletResponse);
    }

    @GetMapping("/redirect")
    public ResponseEntity<?> kakaoRedirect(@RequestParam("code") String authCode, HttpServletResponse httpServletResponse) throws Exception{
        String kakaoToken=kakaoClient.getToken(authCode); // authCode로 token 요청
        KakaoProfile kakaoProfile=kakaoClient.getUserInfo(kakaoToken); // token으로 kakao member data 요청
        LoginMemberResponse member=socialService.kakaoLoginOrRegister(kakaoProfile);        // kakaoProfile 정보로 member 조회 or 저장

        Map<String, Object> tokenMap = new HashMap<>();
        tokenMap.put("id", member.getMemberId());
        tokenMap.put("nickname", member.getNickname());
        String accessToken = jwtService.createAccessToken(tokenMap); // AccessToken 생성
        String refreshToken = jwtService.createRefreshToken(tokenMap);  // RefreshToken 생성

        memberService.saveRefreshToken(member.getMemberId(), refreshToken); // 토큰 저장

        // 이동할 프론트 페이지 주소 설정
        String frontURI = frontURIHelper.getFrontURI(member.getIsNewMember(), member.getNickname());

        Cookie[] cookies = cookieHelper.createTokenInfoCookies(accessToken, refreshToken, member.getMemberId().toString());
        for (Cookie cookie : cookies) {
            httpServletResponse.addCookie(cookie);
        }

        return ResponseEntity
                .status(HttpStatus.FOUND) // 302
                .location(URI.create(frontURI))
                .build();
    }

}

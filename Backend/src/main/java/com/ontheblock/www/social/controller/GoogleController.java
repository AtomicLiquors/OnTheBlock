package com.ontheblock.www.social.controller;

import com.ontheblock.www.JWT.JwtService;
import com.ontheblock.www.global.exception.GoogleLoginErrorException;
import com.ontheblock.www.member.service.MemberService;
import com.ontheblock.www.social.dto.response.LoginMemberResponse;
import com.ontheblock.www.social.domain.google.GoogleClient;
import com.ontheblock.www.social.domain.google.GoogleUserInfo;
import com.ontheblock.www.social.service.SocialService;
import com.ontheblock.www.social.util.SocialHelper;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

@RequestMapping("/google")
@RestController
@RequiredArgsConstructor
public class GoogleController {

    private final GoogleClient googleClient;
    private final SocialService socialService;
    private final JwtService jwtService;
    private final MemberService memberService;
    private final SocialHelper socialHelper;

    @GetMapping("/login")
    public void googleLoginOrRegister(HttpServletResponse httpServletResponse) throws Exception{
        googleClient.getAuthCode(httpServletResponse);
    }

    @GetMapping("/redirect")
    public ResponseEntity<?> googleRedirect(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, @RequestParam(required = false) String error) throws Exception{
        if(error != null)
            throw new GoogleLoginErrorException(error);

        String googleToken = googleClient.getToken(httpServletRequest.getParameter("code")); // authCode로 token 요청
        GoogleUserInfo googleUserInfo = googleClient.getUserInfo(googleToken); // token으로 google member data 요청
        LoginMemberResponse member = socialService.googleLoginOrRegister(googleUserInfo);        // GoogleUserInfo 정보로 member 조회 or 저장

        Map<String, Object> tokenMap = new HashMap<>();
        tokenMap.put("id", member.getMemberId());
        tokenMap.put("nickname", member.getNickname());
        String accessToken = jwtService.createAccessToken(tokenMap); // AccessToken 생성
        String refreshToken = jwtService.createRefreshToken(tokenMap);  // RefreshToken 생성

        memberService.saveRefreshToken(member.getMemberId(), refreshToken); // 토큰 저장

        // 이동할 프론트 페이지 주소 설정
        String frontURI = googleClient.getFrontURI(member.getIsNewMember(), member.getNickname());
        /*
            Cookie cookie = socialHelper.createTokenInfoCookie(accessToken, refreshToken, member.getMemberId());
            httpServletResponse.addCookie(cookie);
            보류 : cookie는 쌍따옴표를 허용하지 않으며, JSON에서 쌍따옴표를 빼면 파싱할 때 invalid한 것으로 인식된다.
         */

        Cookie cookie = new Cookie("accessToken", accessToken);
        cookie.setHttpOnly(false);
        cookie.setMaxAge(3600); // 쿠키 유효 시간 설정 (예: 1시간)
        cookie.setPath("/");
        httpServletResponse.addCookie(cookie);

        Cookie cookie2 = new Cookie("refreshToken",refreshToken);
        cookie2.setHttpOnly(false);
        cookie2.setMaxAge(3600);
        cookie2.setPath("/");
        httpServletResponse.addCookie(cookie2);

        Cookie cookie3 = new Cookie("memberId",member.getMemberId().toString());
        cookie3.setHttpOnly(false);
        cookie3.setMaxAge(3600);
        cookie3.setPath("/");
        httpServletResponse.addCookie(cookie3);

        return ResponseEntity
            .status(HttpStatus.FOUND) // 302
            .location(URI.create(frontURI))
            .build();

    }
}

package com.ontheblock.www.social.controller;

import com.ontheblock.www.JWT.JwtService;
import com.ontheblock.www.member.service.MemberService;
import com.ontheblock.www.social.dto.response.LoginMemberResponse;
import com.ontheblock.www.social.domain.naver.NaverClient;
import com.ontheblock.www.social.domain.naver.NaverProfile;
import com.ontheblock.www.social.service.SocialService;
import com.ontheblock.www.social.util.SocialHelper;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RequestMapping("/naver")
@RestController
@RequiredArgsConstructor
public class NaverController {

    private final NaverClient naverClient;
    private final SocialService socialService;
    private final JwtService jwtService;
    private final MemberService memberService;
    private final SocialHelper socialHelper;

    @GetMapping("/login")
    public void naverLoginOrRegister(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws Exception{
        naverClient.getAuthCode(httpServletRequest, httpServletResponse);
    }

    @GetMapping("/redirect")
    public ResponseEntity<?> naverRedirect(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, SessionStatus sessionStatus) throws Exception{
        // To-Do : 404 에러 처리
        String code = httpServletRequest.getParameter("code");
        String state = httpServletRequest.getParameter("state");

        String naverToken = naverClient.getToken(code, state); // authCode로 token 요청

        // To-Do : 토큰이 null인 경우 에러처리
        NaverProfile naverProfile = naverClient.getUserInfo(naverToken);

        // To-Do : NaverClient가 UserInfo를 받아오지 못한 경우 에러처리
        LoginMemberResponse member = socialService.naverLoginOrRegister(naverProfile);

        Map<String, Object> tokenMap = new HashMap<>();
        tokenMap.put("id", member.getMemberId());
        tokenMap.put("nickname", member.getNickname());
        String accessToken = jwtService.createAccessToken(tokenMap); // AccessToken 생성
        String refreshToken = jwtService.createRefreshToken(tokenMap);  // RefreshToken 생성

        memberService.saveRefreshToken(member.getMemberId(), refreshToken); // 토큰 저장

        // 이동할 프론트 페이지 주소 설정
        String frontURI = socialHelper.getFrontURI(member.getIsNewMember(), member.getNickname());

        // 쿠키로 보내면 자동으로 local에 저장됨.
        Cookie accessTokenCookie = new Cookie("accessToken", accessToken);
        accessTokenCookie.setHttpOnly(false);
        accessTokenCookie.setMaxAge(3600); // 쿠키 유효 시간 설정 (예: 1시간)
        accessTokenCookie.setPath("/");
        httpServletResponse.addCookie(accessTokenCookie);

        Cookie refreshTokenCookie = new Cookie("refreshToken",refreshToken);
        refreshTokenCookie.setHttpOnly(false);
        refreshTokenCookie.setMaxAge(3600);
        refreshTokenCookie.setPath("/");
        httpServletResponse.addCookie(refreshTokenCookie);

        Cookie memberIdCookie = new Cookie("memberId",member.getMemberId().toString());
        memberIdCookie.setHttpOnly(false);
        memberIdCookie.setMaxAge(3600);
        memberIdCookie.setPath("/");
        httpServletResponse.addCookie(memberIdCookie);

        return ResponseEntity
                .status(HttpStatus.FOUND) // 302
                .location(URI.create(frontURI))
                .build();
    }

}

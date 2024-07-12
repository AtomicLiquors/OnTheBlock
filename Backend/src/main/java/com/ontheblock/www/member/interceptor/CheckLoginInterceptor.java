package com.ontheblock.www.member.interceptor;

import com.ontheblock.www.JWT.service.JwtService;
import com.ontheblock.www.member.domain.Member;
import com.ontheblock.www.member.repository.MemberRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.Optional;

// AccessToken이 유효한지 확인해주는 클래스
@Component
public class CheckLoginInterceptor implements HandlerInterceptor {

  private static final Logger logger = LoggerFactory.getLogger(CheckLoginInterceptor.class);
  private static final String SUCCESS = "success";
  private static final String FAIL = "fail";

  private static final String NOT_REGISTERED_MSG = "MEMBER IS NOT REGISTERED";
  private static final String INVALID_REFRESHTOKEN_MSG = "TOKEN IS NOT VALID NEED REFRESHTOKEN";
  private JwtService jwtService;
  private MemberRepository memberRepository;
  public CheckLoginInterceptor(JwtService jwtService, MemberRepository memberRepository) {
    super();
    this.jwtService = jwtService;
    this.memberRepository = memberRepository;
  }

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
      throws Exception {

    if (PreflightChecker.isPreflightRequest(request)) {
      return true;
    }

    String accessToken = request.getHeader("accessToken"); // 헤더에서 토큰 꺼냄
    logger.debug(accessToken);
    // AccessToken이 유효한지 체크
    if (jwtService.checkToken(accessToken)) {
      Long id = jwtService.getIdFromToken(accessToken); // 토큰에서 id값을 꺼냄
      Optional<Member> member = memberRepository.findById(id);

      if (member.isPresent()) {
        request.setAttribute("id", id);
        // reqeust에 id를 담아서 controller로 보냄
        return true;
      } else {
        logger.error(NOT_REGISTERED_MSG);
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.getWriter().write(NOT_REGISTERED_MSG);
        return false;
      }
    }
    logger.error(INVALID_REFRESHTOKEN_MSG);
    response.setStatus(HttpStatus.UNAUTHORIZED.value());
    response.getWriter().write(INVALID_REFRESHTOKEN_MSG);
    return false;
  }
}

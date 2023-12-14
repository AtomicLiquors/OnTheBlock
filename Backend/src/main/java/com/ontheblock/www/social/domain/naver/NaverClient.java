package com.ontheblock.www.social.domain.naver;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.math.BigInteger;
import java.security.SecureRandom;


@Component
@RequiredArgsConstructor
public class NaverClient {
    @Value("${naver.client.id}")
    private String clientId;
    @Value("${naver.api.host}")
    private String apiURL;
    @Value("${naver.auth.host}")
    private String authURL;
    @Value("${naver.url.redirect}")
    private String redirectURL;

    @Value("${front.scheme}")
    private String frontScheme;
    @Value("${front.host}")
    private String frontHost;

    private RestTemplate restTemplate = new RestTemplate();

    // Redirect to get authorization code


    /*
    *상태 토큰을 정상적으로 생성했다면 네이버 로그인 페이지를 호출하는 인증 요청문(authentication request)을 생성하도록 합니다. 인증 요청문은 URL 형식으로 되어 있으며 네이버가 제공하는 인증 URL과 클라이언트 아이디, 상태 토큰으로 이루어져 있습니다. 인증 과정은 모두 HTTPS 통신으로 이루어지며 인증 요청문 형식은 다음과 같습니다.
    * https://nid.naver.com/oauth2.0/authorize?client_id={클라이언트 아이디}&response_type=code&redirect_uri={개발자 센터에 등록한 콜백 URL(URL 인코딩)}&state={상태 토큰}
    * */
    public void getAuthCode(HttpServletResponse httpServletResponse) throws Exception {
        UriComponents uriComponents = UriComponentsBuilder.newInstance()
                .scheme("https")
                .host(authURL)
                .path("/oauth2.0/authorize")
                .queryParam("client_id", clientId)
                .queryParam("redirect_uri", redirectURL)
                .queryParam("response_type", "code")
                .build();
        httpServletResponse.sendRedirect(uriComponents.toString());
    }



    public String getToken(String authCode) throws Exception {
        // make Header
        HttpHeaders httpHeaders=new HttpHeaders();
        httpHeaders.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        String state = generateState();

        // make Body
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("client_id", clientId);
        body.add("redirect_uri", redirectURL);
        body.add("code", authCode);
        body.add("state", state);

        // HttpHeader와 HttpBody를 하나의 오브젝트에 담기
        HttpEntity<?> naverTokenRequest = new HttpEntity<>(body, httpHeaders);

        // HTTP 토큰 요청하기 - 토큰 요청 발급 주소(POST)
        UriComponents uriComponents = UriComponentsBuilder.newInstance()
                .scheme("https")
                .host(authURL)
                .path("/oauth2.0/token")
                .build();

       NaverToken naverToken = restTemplate.postForObject(uriComponents.toString(), naverTokenRequest, NaverToken.class);

       return naverToken.getAccessToken();
    }

    public NaverProfile getUserInfo(String accessToken) {
        // Make Header
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Authorization", "Bearer " + accessToken);
        httpHeaders.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<?> request = new HttpEntity<>(httpHeaders);

        UriComponents uriComponents = UriComponentsBuilder.newInstance()
                .scheme("https")
                .host(apiURL)
                .path("/v2/user/me")
                .build();
        return restTemplate.postForObject(uriComponents.toString(), request, NaverProfile.class);
    }

    public String getFrontURI(int isNewMember, String nickName) {
        return UriComponentsBuilder.newInstance()
                .scheme(frontScheme)
                .host(frontHost)
                .path("/bridge")
                .queryParam("isNewMember", isNewMember)
                .queryParam("nickName",nickName)
                .build()
                .toString();
    }

    // 상태 토큰으로 사용할 랜덤 문자열 생성
    public String generateState()
    {
        System.out.println("상태 토큰 생성 중...");
        SecureRandom random = new SecureRandom();
        return new BigInteger(130, random).toString(32);
    }
}

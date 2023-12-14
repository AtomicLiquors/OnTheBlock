package com.ontheblock.www.social.domain.naver;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ontheblock.www.social.domain.google.GoogleUserInfo;
import com.ontheblock.www.social.domain.kakao.KakaoProfile;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Data
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class NaverProfile {

    @JsonProperty("response")
    private NaverResponse naverResponse;
    @Getter
    @JsonIgnoreProperties(ignoreUnknown = true)
    static class NaverResponse {
        private String email;
        private String nickname;
        private String profile_image;
    }

    public String getEmail() {
        NaverResponse naverResponse = getNaverResponse();
        return returnValueIfNotNull(naverResponse, naverResponse.getEmail());
    }

    public String getNickname() {
        NaverResponse naverResponse = getNaverResponse();
        return returnValueIfNotNull(naverResponse, naverResponse.getNickname());
    }

    public String getProfileImageUrl() {
        NaverResponse naverResponse = getNaverResponse();
        return returnValueIfNotNull(naverResponse, naverResponse.getProfile_image());
    }

    public String returnValueIfNotNull(NaverResponse naverResponse, String result){
        if(naverResponse == null){
            return "";
        } else {
            return result;
        }
    }
}


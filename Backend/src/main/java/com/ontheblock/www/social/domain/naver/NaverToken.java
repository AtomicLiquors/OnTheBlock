package com.ontheblock.www.social.domain.naver;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class NaverToken {
    @JsonProperty("token_type")
    private String tokenType;

    @JsonProperty("state")
    private String state;

    @JsonProperty("access_token")
    private String accessToken;

    @JsonProperty("expires_in")
    private String expiresIn;

    @JsonProperty("refresh_token")
    private String refreshToken;

    @JsonProperty("error")
    private String error;

    @JsonProperty("error_description")
    private String error_description;
}
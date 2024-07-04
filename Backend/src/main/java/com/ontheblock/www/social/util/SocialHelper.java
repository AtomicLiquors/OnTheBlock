package com.ontheblock.www.social.util;

import org.json.simple.JSONObject;
import org.springframework.stereotype.Component;

@Component
public class SocialHelper {
    public String createTokenInfoJson(String accessToken, String refreshToken, Long memberId){
        JSONObject json = new JSONObject();
        json.put("accessToken", accessToken);
        json.put("refreshToken", refreshToken);
        json.put("memberId", memberId);

        return json.toJSONString();
    }
}

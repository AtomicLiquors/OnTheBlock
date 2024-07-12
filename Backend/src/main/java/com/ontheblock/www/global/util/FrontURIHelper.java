package com.ontheblock.www.global.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

@Component
public class FrontURIHelper {
    @Value("${front.scheme}")
    private String frontScheme;
    @Value("${front.host}")
    private String frontHost;
    public String getFrontURI(boolean isNewMember, String nickname) {
        return UriComponentsBuilder.newInstance()
                .scheme(frontScheme)
                .host(frontHost)
                .path("/bridge")
                .queryParam("isNewMember", isNewMember)
                .queryParam("nickname",nickname)
                .build()
                .toString();
    }
}

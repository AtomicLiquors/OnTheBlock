package com.ontheblock.www.social.helper;

import com.ontheblock.www.social.util.SocialHelper;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.containsString;

@Slf4j
@SpringBootTest
public class SocialHelperTest {
    @Autowired
    private SocialHelper socialHelper;

    @Test
    public void createCookieTest(){
        String accessToken = "sample_random_accesstoken";
        String refreshToken = "sample_random_refreshToken";
        Long memberId = 1L;

        String json = socialHelper.createTokenInfoJson(accessToken, refreshToken, memberId);
        log.info(json);
        assertThat(json, containsString("accessToken"));
    }
}
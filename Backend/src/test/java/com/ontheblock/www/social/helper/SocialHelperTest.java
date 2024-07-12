package com.ontheblock.www.social.helper;

import com.ontheblock.www.social.util.CookieHelper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.hamcrest.MatcherAssert.assertThat;

@Slf4j
@SpringBootTest
public class SocialHelperTest {
    @Autowired
    private CookieHelper cookieHelper;

}

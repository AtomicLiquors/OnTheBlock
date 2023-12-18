package com.ontheblock.www.member.controller;

import com.ontheblock.www.member.domain.Member;
import com.ontheblock.www.member.dto.response.MemberProfileResponse;
import com.ontheblock.www.member.service.MemberService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(MemberControllerTest.class)
public class MemberControllerTest {

    @MockBean
    private MemberService memberService;

    protected MockMvc mockMvc;

    /**
     * Error creating bean with name 'checkLoginInterceptor' defined in file [C:\Users\Legion\Desktop\ontheblock\Backend\out\production\classes\com\ontheblock\www\member\interceptor\CheckLoginInterceptor.class]: Unsatisfied dependency expressed through constructor parameter 0: No qualifying bean of type 'com.ontheblock.www.member.JWT.JwtService' available: expected at least 1 bean which qualifies as autowire candidate. Dependency annotations: {}
     * @throws Exception
     */
    @Test
    @DisplayName("회원 정보 조회")
    void memberInfo() throws Exception {
        // given
        MemberProfileResponse response = new MemberProfileResponse(Member.of("nickname", "description"));
        given(memberService.getMemberInfoById(any(Long.class))).willReturn(response);

        // when
        ResultActions perform = mockMvc.perform(get("/api/v2/member"));

        // then
        perform.andExpect(status().isOk());
    }
}

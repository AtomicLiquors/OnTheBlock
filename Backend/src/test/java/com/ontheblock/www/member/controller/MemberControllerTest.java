package com.ontheblock.www.member.controller;

import com.ontheblock.www.JWT.JwtService;
import com.ontheblock.www.member.domain.Member;
import com.ontheblock.www.member.dto.response.MemberProfileResponse;
import com.ontheblock.www.member.interceptor.CheckLoginInterceptor;
import com.ontheblock.www.member.repository.MemberRepository;
import com.ontheblock.www.member.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.request;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
@WebMvcTest(value = MemberControllerTest.class,
        excludeFilters = {
                @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = JwtService.class),
        })
public class MemberControllerTest {
    @MockBean
    private MemberService memberService;

    @MockBean
    private MemberRepository memberRepository;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private CheckLoginInterceptor checkLoginInterceptor;

    @Autowired
    protected MockMvc mockMvc;

    @Test
    @DisplayName("회원 정보 조회")
    void memberInfo() throws Exception {
        // given
        MemberProfileResponse response = new MemberProfileResponse(Member.of("nickname", "description"));
        given(memberService.getMemberInfoById(any(Long.class))).willReturn(response);
        given(memberRepository.findById(any(Long.class))).willReturn(Optional.of(Member.of("nickname", "description")));
        given(jwtService.checkToken(any(String.class))).willReturn(true);

        // when
        ResultActions perform = mockMvc.perform(get("/api/member/check?memberId=1").header("accessToken", "temporaryAccessToken"));
        /* API에 지정된 URI는 맞게 타고 들어갔는데, 왜 404가 뜨는가?*/

        // then
         perform.andExpect(status().isOk());
    }
}

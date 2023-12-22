package com.ontheblock.www.member.controller;

import com.ontheblock.www.JWT.JwtService;
import com.ontheblock.www.instrument.service.MemberInstrumentService;
import com.ontheblock.www.member.domain.Member;
import com.ontheblock.www.member.dto.response.MemberProfileResponse;
import com.ontheblock.www.member.interceptor.CheckLoginInterceptor;
import com.ontheblock.www.member.repository.MemberRepository;
import com.ontheblock.www.member.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
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
@WebMvcTest(value = MemberControllerTest.class)
@AutoConfigureMockMvc(addFilters = false)
@Slf4j
public class MemberControllerTest {
    @MockBean
    private MemberService memberService;

    @MockBean
    private MemberRepository memberRepository;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private MemberInstrumentService memberInstrumentService;

    @MockBean
    private CheckLoginInterceptor checkLoginInterceptor;

    @Autowired
    protected MockMvc mockMvc;

    public static final String serverOrigin = "http://localhost:9999";

    @Test
    @DisplayName("비디오 정보 조회")
    void videoInfo() throws Exception {
        // given
        MemberProfileResponse response = new MemberProfileResponse(Member.of(1L, "nickname", "description"));
        given(memberService.getMemberInfoById(any(Long.class))).willReturn(response);
        given(memberRepository.findById(any(Long.class))).willReturn(Optional.of(Member.of(1L, "nickname", "description")));
        given(jwtService.checkToken(any(String.class))).willReturn(true);

        // when
        //ResultActions perform = mockMvc.perform(get("/api/videos/latest")
        ResultActions perform = mockMvc.perform(get(serverOrigin + "/ontheblock/api/videos/latest")
                //.header("accessToken", "temporaryAccessToken")
                .header("Origin", serverOrigin)
                .header("Access-Control-Request-Method", "GET"));

        // then
         perform.andExpect(status().isOk());
    }



    @Test
    @DisplayName("회원 정보 조회")
    void memberIntsrumentsInfo() throws Exception {
        // given
        MemberProfileResponse response = new MemberProfileResponse(Member.of(1L, "nickname", "description"));
        given(memberService.getMemberInfoById(any(Long.class))).willReturn(response);
        given(memberRepository.findById(any(Long.class))).willReturn(Optional.of(Member.of("nickname", "description")));
        given(jwtService.checkToken(any(String.class))).willReturn(true);

    }
}

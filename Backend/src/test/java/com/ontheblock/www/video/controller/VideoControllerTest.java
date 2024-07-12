package com.ontheblock.www.video.controller;

import com.ontheblock.www.JWT.service.JwtService;
import com.ontheblock.www.OntheblockApplication;
import com.ontheblock.www.member.repository.MemberRepository;
import com.ontheblock.www.member.service.MemberService;
import com.ontheblock.www.video.repository.VideoRepository;
import com.ontheblock.www.video.service.VideoService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(value = VideoControllerTest.class)
//@AutoConfigureMockMvc(addFilters = false)
@ContextConfiguration(classes = OntheblockApplication.class)
@Slf4j
public class VideoControllerTest {
    @MockBean
    private VideoService videoService;
    @MockBean
    private VideoRepository videoRepository;
    @MockBean
    private MemberService memberService;
    @MockBean
    private MemberRepository memberRepository;
    @MockBean
    private JwtService jwtService;
    @Autowired
    protected MockMvc mockMvc;
    @Autowired
    WebApplicationContext webApplicationContext;

    public static final String serverOrigin = "http://localhost:9999";

    @BeforeEach
    public void init() throws Exception {
        mockMvc = MockMvcBuilders.webAppContextSetup(this.webApplicationContext).build();
    }

    @Test
    @DisplayName("비디오 정보 조회")
    void videoListInfo() throws Exception {
        /* To-Do : 404 에러 확인 후 조치. */
        // given

        // when
       // ResultActions perform = mockMvc.perform(get("/api/videos/latest")
        ResultActions perform = mockMvc.perform(get("/api/videos/latest")
                .header("Origin", serverOrigin)
                .header("Access-Control-Request-Method", "GET"));

        // then
        perform.andExpect(status().isOk());
    }
}

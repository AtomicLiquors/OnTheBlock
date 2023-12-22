package com.ontheblock.www.member.service;

import com.ontheblock.www.OntheblockApplication;
import com.ontheblock.www.member.domain.Member;
import com.ontheblock.www.member.dto.response.MemberProfileResponse;
import com.ontheblock.www.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
@ContextConfiguration(classes = OntheblockApplication.class)
public class MemberServiceTest {

    @Autowired
    MemberRepository memberRepository;
    @Autowired
    MemberService memberService;

    private Member member;

    @BeforeEach
    void init(){
        member = Member.of("nickname", "test@gmail.com");
    }
    @Test
    @DisplayName("회원 정보 조회 테스트")
    void getMemberInfoById(){
        // given
        Member savedMember = memberRepository.save(member);
        Long id = savedMember.getId();

        // when
        MemberProfileResponse foundMember = memberService.getMemberInfoById(id);

        // then
        assertThat(foundMember.getId()).isEqualTo(savedMember.getId());
        assertThat(foundMember.getNickname()).isEqualTo(savedMember.getNickname());
    }

    @Test
    @DisplayName("회원 닉네임 변경 테스트")
    void changeMemberNickname(){
        // given
        Member savedMember = memberRepository.save(member);
        Long id = savedMember.getId();
        String newNickname = "newNickname";

        // when
        memberService.changeMemberNickname(id, newNickname);
        MemberProfileResponse foundMember = memberService.getMemberInfoById(id);

        // then
        assertThat(foundMember.getId()).isEqualTo(savedMember.getId());
        assertThat(foundMember.getNickname()).isEqualTo(newNickname);
    }
    @Test
    @DisplayName("회원 자기소개 변경 테스트")
    void changeMemberDescription(){
        // given
        Member savedMember = memberRepository.save(member);
        Long id = savedMember.getId();
        String newDesc = "샘플 자기소개입니다";

        // when
        memberService.changeMemberDescription(id, newDesc);
        MemberProfileResponse foundMember = memberService.getMemberInfoById(id);

        // then
        assertThat(foundMember.getId()).isEqualTo(savedMember.getId());
        assertThat(foundMember.getDescription()).isEqualTo(newDesc);
    }

    @Test
    @DisplayName("회원 자기소개 변경 테스트")
    void checkDuplicateNickname(){
        // given
        Member savedMember = memberRepository.save(member);
        String savedNickname = savedMember.getNickname();
        String newNickname = "NonExistingNickName";

        // when
        boolean isSavedNicknameAvailable = memberService.checkDuplicateNickname(savedNickname);
        boolean isNewNicknameAvailable = memberService.checkDuplicateNickname(newNickname);

        // then
        assertThat(isSavedNicknameAvailable).isEqualTo(false);
        assertThat(isNewNicknameAvailable).isEqualTo(true);
    }

}

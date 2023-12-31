package com.ontheblock.www.member.repository;

import com.ontheblock.www.OntheblockApplication;
import com.ontheblock.www.member.domain.Member;
import com.ontheblock.www.member.dto.response.MemberProfileResponse;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
@ContextConfiguration(classes = OntheblockApplication.class)
class MemberRepositoryTest {

    @Autowired
    MemberRepository memberRepository;

    private Member member;
    private String nickname = "JohnDoe";

    private String email = "john@example.com";
    private String description = "A new member";
    private String token = "abc123";

    @BeforeEach
    void initObjects() {
        member = Member.of(nickname, email, description, token);
    }

    @Test
    @DisplayName("회원 저장 테스트")
    void saveMember() {
        // given

        // when
        Member savedMember = memberRepository.save(member);

        // then
        assertThat(savedMember).isEqualTo(member);
    }

    @Test
    @DisplayName("DB ID로 회원 조회 테스트")
    void findMemberById() throws Exception {
        // given
        Member savedMember =  memberRepository.save(member);

        // when
        Member foundMember = memberRepository.findById(savedMember.getId()).orElseThrow(() -> new Exception("회원 조회 실패"));

        // then
        compareTwoMembers(savedMember, foundMember);
    }

    @Test
    @DisplayName("DB ID로 회원 프로필 조회 테스트")
    void findMemberProfileInfoById() throws Exception {
        // given
        Member savedMember =  memberRepository.save(member);

        // when
        MemberProfileResponse response = memberRepository.findMemberProfileInfoById(savedMember.getId()).orElseThrow(() -> new Exception("회원 조회 실패"));

        // then
        assertThat(response.getNickname()).isEqualTo(savedMember.getNickname());
        assertThat(response.getDescription()).isEqualTo(savedMember.getDescription());
    }

    @Test
    @DisplayName("이메일로 회원 조회 테스트")
    void findMemberByEmail() throws Exception {
        // given
        Member savedMember =  memberRepository.save(member);

        // when
        Member foundMember = memberRepository.findByEmail(savedMember.getEmail()).orElseThrow(() -> new Exception("회원 조회 실패"));

        // then
        compareTwoMembers(savedMember, foundMember);
    }


    @Test
    @DisplayName("닉네임으로 회원 조회 테스트")
    void findMemberByNickname() throws Exception {
        // given
        Member savedMember =  memberRepository.save(member);

        // when
        Member foundMember = memberRepository.findByNickname(savedMember.getNickname()).orElseThrow(() -> new Exception("회원 조회 실패"));

        // then
        compareTwoMembers(savedMember, foundMember);
    }


    @Test
    @DisplayName("리프레시 토큰으로 회원 조회 테스트")
    void findRefreshTokenById() throws Exception {
        // given
        Member savedMember =  memberRepository.save(member);

        // when
        String foundToken = memberRepository.findRefreshTokenById(savedMember.getId()).orElseThrow(() -> new Exception("토큰 조회 실패"));

        // then
        assertThat(savedMember.getToken()).isEqualTo(foundToken);
    }


    private void compareTwoMembers(Member member1, Member member2){
        assertThat(member1.getId()).isEqualTo(member2.getId());
        assertThat(member1.getEmail()).isEqualTo(member2.getEmail());
        assertThat(member1.getDescription()).isEqualTo(member2.getDescription());
        assertThat(member1.getToken()).isEqualTo(member2.getToken());
    }
}

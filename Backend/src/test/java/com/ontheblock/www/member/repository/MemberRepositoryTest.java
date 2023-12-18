package com.ontheblock.www.member.repository;

import com.ontheblock.www.OntheblockApplication;
import com.ontheblock.www.member.domain.Member;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ContextConfiguration(classes = OntheblockApplication.class)
class MemberRepositoryTest {

    @Autowired
    MemberRepository memberRepository;

    private Member member;

    @BeforeEach
    void initObjects() {
    }

    @Test
    @DisplayName("회원 저장 테스트")
    void saveMember() {
        // given
        Member member = Member.of("JohnDoe", "john@example.com", "A new member", "abc123");

        // when
        Member savedMember = memberRepository.save(member);

        // then
        assertThat(savedMember).isEqualTo(member);
    }
}

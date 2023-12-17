package com.ontheblock.www.member.repository;

import com.ontheblock.www.member.domain.Member;
import com.ontheblock.www.member.dto.response.MemberProfileResponse;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(@Param("email") String email);

    Optional<Member> findByNickname(@Param("nickname") String nickname);

    // 토큰 반환
    @Query("select m.token from Member m where m.id = :memberId")
    String findByRefreshToken(@Param("memberId") Long memberId);

    // Id로 프로필 정보 조회
    @Query("select new com.ontheblock.www.member.dto.response.MemberProfileResponse(m) from Member m where m.id = :id")
    Optional<MemberProfileResponse> findMemberProfileInfoById(@Param("id") Long id);

}

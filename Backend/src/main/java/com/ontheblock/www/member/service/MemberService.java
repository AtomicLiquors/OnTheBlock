package com.ontheblock.www.member.service;

import com.ontheblock.www.member.domain.Member;
import com.ontheblock.www.member.dto.response.MemberProfileResponse;
import com.ontheblock.www.member.repository.MemberRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
public class MemberService {

	private MemberRepository mr;
	private MemberProfileResponse mpr;

	public MemberService(MemberRepository mr) {
		this.mr = mr;
	}

	public void saveRefreshToken(Long memberId, String refreshToken) {
		Optional<Member> optionalMember = mr.findById(memberId);
		if (optionalMember.isPresent()) {
			Member member = optionalMember.get();
			member.updateToken(refreshToken);
		} else {
			 throw new EntityNotFoundException("Member Not Found");
		}
		//To-Do : 회원 조회 실패 시 커스텀 에러 발생시키기.
	}

	public String getRefreshToken(Long memberId) {
		String token = mr.findRefreshTokenById(memberId).orElseThrow(() -> new EntityNotFoundException("Member Not Found"));
		return token;
	}

	public void deleteRefreshToken(Long memberId) {
		Member member = mr.findById(memberId).orElseThrow(() -> new EntityNotFoundException("Member Not Found"));
		member.updateToken("");
	}

	//To-Do : getMember 메서드의 사용처 확인 후 getMemberInfoById와 명확한 구분 필요.
	public Member getMember(Long memberId) {
		Member member = mr.findById(memberId).orElseThrow(() -> new EntityNotFoundException("Member Not Found"));
		return member;
	}

	// 프로필 정보 조회
	public MemberProfileResponse getMemberInfoById(Long id) {
		return mr.findMemberProfileInfoById(id).orElse(null);
	}

	// 닉네임 변경
	// 닉네임 길이 제한
	private static final int MIN_NICKNAME_LENGTH = 1;
	private static final int MAX_NICKNAME_LENGTH = 11;

	public void changeMemberNickname(Long id, String nickname) {
		if (nickname != null) {
			if (nickname.length() < MIN_NICKNAME_LENGTH) {
				throw new IllegalArgumentException(
					"Nickname is below the minimum length of " + MIN_NICKNAME_LENGTH + " characters.");
			}
			if (nickname.length() > MAX_NICKNAME_LENGTH) {
				throw new IllegalArgumentException(
					"Nickname exceeds the maximum length of " + MAX_NICKNAME_LENGTH + " characters.");
			}
		}

		Member member = mr.findById(id)
			.orElseThrow(() -> new IllegalArgumentException("Invalid user Id:" + id));
		member.updateNickname(nickname);
		mr.save(member);
	}

	// 자기소개 변경
	// 자기소개 길이 제한
	private static final int MIN_DESCRIPTION_LENGTH = 1;
	private static final int MAX_DESCRIPTION_LENGTH = 41;

	public void changeMemberDescription(Long id, String description) {
		if (description != null) {
			if (description.length() < MIN_DESCRIPTION_LENGTH) {
				throw new IllegalArgumentException(
					"Description is below the minimum length of " + MIN_DESCRIPTION_LENGTH + " characters.");
			}
			if (description.length() > MAX_DESCRIPTION_LENGTH) {
				throw new IllegalArgumentException(
					"Description exceeds the maximum length of " + MAX_DESCRIPTION_LENGTH + " characters.");
			}
		}

		Member member = mr.findById(id)
			.orElseThrow(() -> new IllegalArgumentException("Invalid user Id:" + id));
		member.updateDescription(description);
		mr.save(member);
	}

	// 닉네임 중복 검사
	// To-Do : 리턴되는 true, false 값의 의미를 메서드명으로 유추 가능한지 논의 필요.
	public Boolean checkDuplicateNickname(String nickname){
		Optional<Member> optionalMember = mr.findByNickname(nickname);
		return optionalMember.isEmpty();
	}
}

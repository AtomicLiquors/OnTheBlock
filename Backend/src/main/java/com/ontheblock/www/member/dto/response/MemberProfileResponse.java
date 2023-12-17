package com.ontheblock.www.member.dto.response;

import com.ontheblock.www.member.domain.Member;

import lombok.Data;

@Data
public class MemberProfileResponse {
	private Long id;
	private String nickname;
	private String description;

	// 프로필 정보
	public MemberProfileResponse(Member member) {
		this.id = member.getId();
		this.nickname = member.getNickname();
		this.description = member.getDescription();
	}
}

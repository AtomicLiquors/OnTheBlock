package com.ontheblock.www.social.dto.response;

import com.ontheblock.www.member.domain.Member;
import lombok.Data;

@Data
public class LoginMemberResponse {
    private Long memberId;
    private String nickname;
    private int isNewMember;

    public LoginMemberResponse(Member member, int isNewMember){
        this.memberId = member.getId();
        this.nickname = member.getNickname();
        this.isNewMember = isNewMember;
    }
}

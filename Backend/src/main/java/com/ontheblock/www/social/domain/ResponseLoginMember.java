package com.ontheblock.www.social.domain;

import com.ontheblock.www.member.domain.Member;
import lombok.Data;

@Data
public class ResponseLoginMember {
    private Long memberId;
    private String nickname;
    private int isNewMember;

    public ResponseLoginMember(Member member, int isNewMember){
        this.memberId=member.getId();
        this.nickname=member.getNickname();
        this.isNewMember=isNewMember;
    }
}

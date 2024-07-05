package com.ontheblock.www.social.service;

import com.ontheblock.www.member.domain.Member;
import com.ontheblock.www.member.repository.MemberRepository;
import com.ontheblock.www.social.dto.response.LoginMemberResponse;
import com.ontheblock.www.social.domain.google.GoogleUserInfo;
import com.ontheblock.www.social.domain.kakao.KakaoProfile;
import com.ontheblock.www.social.domain.naver.NaverProfile;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class SocialService {

    private final MemberRepository memberRepository;

    // 카카오 로그인
    public LoginMemberResponse kakaoLoginOrRegister(KakaoProfile profile) {
        return makeLoginMemberResponse(profile.getEmail(), profile.getNickname());
    }

    // 구글 로그인
    public LoginMemberResponse googleLoginOrRegister(GoogleUserInfo googleUserInfo) {
        return makeLoginMemberResponse(googleUserInfo.getEmail(), googleUserInfo.getNickname());
    }

    public LoginMemberResponse naverLoginOrRegister(NaverProfile profile){
        return makeLoginMemberResponse(profile.getEmail(), profile.getNickname());
    }


    // ResponseLoginMember 생성 후 반환
    public LoginMemberResponse makeLoginMemberResponse(String email, String nickname){
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        // 새로 가입한 멤버인 경우 새로 생성하여 저장 후 반환
        if (!optionalMember.isPresent()) {
            Member member = Member.of(nickname, email, null, null);
            member.updateEmail(email);
            member.updateNickname(nickname);

            memberRepository.save(member);
            return new LoginMemberResponse(member, true);
        }
        // 이미 가입한 멤버인 경우 유저 정보 반환
        return new LoginMemberResponse(optionalMember.get(), false);
    }
}

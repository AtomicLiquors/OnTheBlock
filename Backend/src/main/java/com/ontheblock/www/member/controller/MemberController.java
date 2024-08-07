package com.ontheblock.www.member.controller;

import com.ontheblock.www.genre.service.MemberGenreService;
import com.ontheblock.www.instrument.service.InstrumentService;
import com.ontheblock.www.member.dto.request.MemberInitRequest;
import jakarta.servlet.http.HttpServletRequest;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ontheblock.www.member.dto.response.MemberProfileResponse;
import com.ontheblock.www.member.service.MemberService;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
@Slf4j
public class MemberController {

	private final MemberService memberService;
	private final InstrumentService instrumentService;
	private final MemberGenreService memberGenreService;

	// 요청 유저의 ID, 닉네임, 자기소개 조회
	@GetMapping("/me/check")
	public ResponseEntity<MemberProfileResponse> getMyMemberInfo(HttpServletRequest request) {

		Long id = (Long)request.getAttribute("id");
		MemberProfileResponse member = memberService.getMemberInfoById(id);

		if (member == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(member);
	}

	// 해당 유저의 ID, 닉네임, 자기소개 조회
	@GetMapping("/check")
	public ResponseEntity<MemberProfileResponse> getMemberInfo(HttpServletRequest request, Long memberId) {

		MemberProfileResponse member = memberService.getMemberInfoById(memberId);
		if (member == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(member);
	}



	// 닉네임 변경
	@PostMapping("/nickname/check")
	public ResponseEntity<Void> changeMemberNickName(HttpServletRequest request, @RequestParam String nickName) {
		Long id = (Long)request.getAttribute("id");
		memberService.changeMemberNickname(id, nickName);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	// 자기소개 변경
	@PostMapping("/description/check")
	public ResponseEntity<Void> changeMemberDescription(HttpServletRequest request, @RequestParam String description) {
		Long id = (Long)request.getAttribute("id");
		memberService.changeMemberDescription(id, description);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	// 닉네임 중복 조회
	@GetMapping("/nickname")
	public ResponseEntity<Boolean> checkDuplicateNickname(@RequestParam("nickname") String nickname){
		return ResponseEntity.ok(memberService.checkDuplicateNickname(nickname));
	}

	// 처음 가입했을때 닉네임, 관심 악기, 관심 장르 설정
	@PostMapping("/registInit/check")
	public ResponseEntity<Void> registMemberInit(HttpServletRequest request,
												 @RequestBody MemberInitRequest memberInitRequest) {
		Long id = (Long)request.getAttribute("id");
		memberService.changeMemberNickname(id, memberInitRequest.getNickname());
		instrumentService.addMemberInstrument(id, memberInitRequest.getInstruments());
		memberGenreService.addMemberGenre(id, memberInitRequest.getGenres());
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

}

package com.ontheblock.www.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@AllArgsConstructor
@Getter
public enum ExceptionCode {

    GOOGLE_LOGIN_ERROR(BAD_REQUEST, "GOOGLE_001","사용자가 인증을 거부하거나 에러가 발생했습니다.");

    private final HttpStatus httpStatus;
    private final String code;
    private final String message;

}

package com.ontheblock.www.global.exception;

import lombok.Getter;

@Getter
public class GoogleLoginErrorException extends RuntimeException{

    private String errorMsg;
    private final ExceptionCode exceptionCode;

    public GoogleLoginErrorException(String errorMsg){
        this(errorMsg, ExceptionCode.GOOGLE_LOGIN_ERROR);
    }

    public GoogleLoginErrorException(String errorMsg, ExceptionCode exceptionCode) {
        super("Error : Google Responded with \"" + errorMsg + "\"");
        this.exceptionCode = exceptionCode;
    }
}

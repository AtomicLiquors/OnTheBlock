package com.ontheblock.www.global.exception;

import lombok.Getter;

@Getter
public class GoogleLoginErrorException extends RuntimeException{

    private final ExceptionCode exceptionCode;

    public GoogleLoginErrorException(){
        this(ExceptionCode.GOOGLE_LOGIN_ERROR);
    }

    public GoogleLoginErrorException(ExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }
}

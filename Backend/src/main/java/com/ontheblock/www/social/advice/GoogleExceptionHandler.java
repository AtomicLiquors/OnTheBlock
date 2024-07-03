package com.ontheblock.www.social.advice;

import com.ontheblock.www.global.exception.GoogleLoginErrorException;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

//@ControllerAdvice
public class GoogleExceptionHandler {

    @Value("${front.scheme}")
    private String frontScheme;
    @Value("${front.host}")
    private String frontHost;

    @ExceptionHandler(GoogleLoginErrorException.class)
    protected void handleGoogleLoginErrorException(GoogleLoginErrorException exception, HttpServletResponse response) throws IOException {

        String frontURI = UriComponentsBuilder.newInstance()
                .scheme(frontScheme)
                .host(frontHost)
                .path("")
                .queryParam("error", exception.getExceptionCode())
                .build()
                .toString();
        response.sendRedirect(frontURI);
    }
}

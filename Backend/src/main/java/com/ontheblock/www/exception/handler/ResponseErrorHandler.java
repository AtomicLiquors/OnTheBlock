package com.ontheblock.www.exception.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.web.client.DefaultResponseErrorHandler;

import java.io.IOException;

public class ResponseErrorHandler extends DefaultResponseErrorHandler {
    @Override
    public void handleError(ClientHttpResponse response) throws IOException{
        if(response.getStatusCode() == HttpStatus.PRECONDITION_FAILED){
            System.err.println("PRECONDITION FAILED");
        }
    }
}

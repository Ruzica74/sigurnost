package com.example.sigurnost.exception;

import org.springframework.http.HttpStatus;

public class UnauthorizedException extends HttpException{
    public UnauthorizedException() {
        super(HttpStatus.UNAUTHORIZED, null);
    }

    public UnauthorizedException(Object data) {
        super(HttpStatus.UNAUTHORIZED, data);
    }
}

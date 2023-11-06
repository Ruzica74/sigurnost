package com.example.sigurnost.service;

import com.example.sigurnost.model.KorisnikEntity;
import com.example.sigurnost.model.dto.LoginResponse;
import com.example.sigurnost.model.requests.LoginRequest;

public interface AuthService {
    LoginResponse login(LoginRequest request);
    LoginResponse loginGoogle(KorisnikEntity k);
}

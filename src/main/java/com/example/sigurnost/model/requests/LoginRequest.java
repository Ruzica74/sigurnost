package com.example.sigurnost.model.requests;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class LoginRequest {
    @NotBlank
    private String korisnickoIme;
    @NotBlank
    private String lozinka;
}

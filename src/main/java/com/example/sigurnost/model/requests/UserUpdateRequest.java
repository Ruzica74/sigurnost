package com.example.sigurnost.model.requests;

import com.example.sigurnost.model.enums.Role;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class UserUpdateRequest {
    @NotBlank
    private String korisnickoIme;
    @NotBlank
    private String ime;
    @NotBlank
    private String prezime;
    @NotBlank
    @Email
    private String mail;

}

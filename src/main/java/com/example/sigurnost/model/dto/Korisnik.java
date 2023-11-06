package com.example.sigurnost.model.dto;

import com.example.sigurnost.model.DirektorijumEntity;
import com.example.sigurnost.model.enums.Role;
import lombok.Data;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Data
public class Korisnik {
    private Integer id;
    private String ime;
    private String prezime;
    //private String lozinka;
    private Role role;
    private String korisnickoIme;
    private Direktorijum direktorijum;
    private Boolean read;
    private Boolean create;
    private Boolean delete;
    private Boolean update;
}

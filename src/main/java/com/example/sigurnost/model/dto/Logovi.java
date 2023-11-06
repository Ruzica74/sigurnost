package com.example.sigurnost.model.dto;


import com.example.sigurnost.model.KorisnikEntity;
import lombok.Data;

import javax.persistence.Basic;
import javax.persistence.Column;
import java.sql.Timestamp;

@Data
public class Logovi {
    private Integer id;
    private String akcija;
    private Korisnik korisnik;
    private String objekat;
    private Boolean pregledan;
}

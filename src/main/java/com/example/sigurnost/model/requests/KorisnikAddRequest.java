package com.example.sigurnost.model.requests;

import com.example.sigurnost.model.dto.Korisnik;
import lombok.Data;

@Data
public class KorisnikAddRequest extends Korisnik {

    private String lozinka;
    private String domen;
    private String ipAdresa;
    private String mail;
    private String mobilni;
}

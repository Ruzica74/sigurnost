package com.example.sigurnost.model.dto;

import com.example.sigurnost.model.DirektorijumEntity;
import lombok.Data;

import javax.persistence.Basic;
import javax.persistence.Column;

@Data
public class Fajl {
    private Integer id;
    private String naziv;
    private String lokacija;
    private Boolean obrisan;
    private Boolean obavjesten;
    //private int direktorijum;
}

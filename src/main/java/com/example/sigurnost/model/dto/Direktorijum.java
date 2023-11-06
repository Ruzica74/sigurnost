package com.example.sigurnost.model.dto;

import com.example.sigurnost.model.DirektorijumEntity;
import lombok.Data;

import javax.persistence.Basic;
import javax.persistence.Column;
import java.util.List;

@Data
public class Direktorijum {
    private Integer id;
    private String naziv;
    private String lokacija;
    private Boolean obrisan;
    private Boolean obavjesten;
    //private DirektorijumEntity direktorijum;
}

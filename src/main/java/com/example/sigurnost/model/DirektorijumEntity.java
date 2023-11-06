package com.example.sigurnost.model;

import com.example.sigurnost.base.BaseEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Data
@Entity
@Table(name = "direktorijum")
@EntityListeners(AuditingEntityListener.class)
public class DirektorijumEntity implements BaseEntity<Integer> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Basic
    @Column(name = "naziv")
    private String naziv;
    @Basic
    @Column(name = "lokacija")
    private String lokacija;
    @Basic
    @Column(name = "obrisano_vrijeme")
    private Timestamp obrisano_vrijeme;
    @Basic
    @Column(name = "obavjesten")
    private Boolean obavjesten;
    @Basic
    @Column(name = "obrisan")
    private Boolean obrisan;
    @ManyToOne()
    @JoinColumn(name = "direktorijum_id", referencedColumnName = "id")
    private DirektorijumEntity direktorijum;
    /*
    @OneToMany(mappedBy = "direktorijum")
    @JsonIgnore
    private List<DirektorijumEntity> direktorijums;
    @OneToMany(mappedBy = "direktorijum")
    @JsonIgnore
    private List<FajlEntity> files;
    @OneToMany(mappedBy = "direktorijum")
    @JsonIgnore
    private List<KorisnikEntity> korisniks;

    @JsonIgnore
    public List<DirektorijumEntity> getDirektorijums(){
        return direktorijums;
    }

    @JsonIgnore
    public List<FajlEntity> getFiles(){
        return files;
    }

    @JsonIgnore
    public List<KorisnikEntity> getKorisniks(){
        return korisniks;
    }
    */


}

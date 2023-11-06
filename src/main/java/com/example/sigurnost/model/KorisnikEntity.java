package com.example.sigurnost.model;

import com.example.sigurnost.base.BaseEntity;
import com.example.sigurnost.model.enums.Role;
import com.example.sigurnost.model.enums.Status;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "korisnik")
@EntityListeners(AuditingEntityListener.class)
public class KorisnikEntity implements BaseEntity<Integer> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Basic
    @Column(name = "ime")
    private String ime;
    @Basic
    @Column(name = "prezime")
    private String prezime;
    @Basic
    @Column(name = "lozinka")
    private String lozinka;
    @Basic
    @Column(name = "token")
    private String token;
    @Enumerated(EnumType.ORDINAL)
    @Column(name = "role", nullable = false)
    private Role role;
    @Basic
    @Column(name = "prijava_token")
    private String prijavaToken;
    @Basic
    @Column(name = "korisnicko_ime")
    private String korisnickoIme;
    @Basic
    @Column(name = "IP_adresa")
    private String ipAdresa;
    @Basic
    @Column(name = "domen")
    private String domen;
    @Basic
    @Column(name = "mail")
    private String mail;
    @Basic
    @Column(name = "[create]")
    private Boolean create;
    @Basic
    @Column(name = "obrisan")
    private Boolean obrisan=false;
    @Enumerated(EnumType.ORDINAL)
    @Column(name = "status")
    private Status status=Status.ACTIVE;
    @Basic
    @Column(name = "[read]")
    private Boolean read;
    @Basic
    @Column(name = "mobilni")
    private String mobilni;
    @Basic
    @Column(name = "[update]")
    private Boolean update;
    @Basic
    @Column(name = "[delete]")
    private Boolean delete;
    @ManyToOne()
    @JsonIgnore
    @JoinColumn(name = "direktorijum_id", referencedColumnName = "id", nullable = false)
    private DirektorijumEntity direktorijum;
    @OneToMany(mappedBy = "korisnik")
    @JsonIgnore
    private List<LogoviEntity> logovi;

}

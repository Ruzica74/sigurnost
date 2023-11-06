package com.example.sigurnost.model;

import com.example.sigurnost.base.BaseEntity;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@Entity
@Table(name = "logovi")
@EntityListeners(AuditingEntityListener.class)
public class LogoviEntity implements BaseEntity<Integer> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Basic
    @Column(name = "vrijeme")
    private Timestamp vrijeme;
    @Basic
    @Column(name = "akcija")
    private String akcija;
    @Basic
    @Column(name = "objekat")
    private String objekat;
    @Basic
    @Column(name = "pregledan")
    private Boolean pregledan;
    @ManyToOne()
    @JoinColumn(name = "korisnik_id", referencedColumnName = "id", nullable = false)
    private KorisnikEntity korisnik;

}

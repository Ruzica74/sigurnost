package com.example.sigurnost.model;

import com.example.sigurnost.base.BaseEntity;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@Entity
@Table(name = "fajl")
@EntityListeners(AuditingEntityListener.class)
public class FajlEntity implements BaseEntity<Integer> {
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
    @Column(name = "sadrzaj_lokacija")
    private String sadrzajLokacija;
    @Basic
    @Column(name = "obrisan")
    private Boolean obrisan;
    @Basic
    @Column(name = "obavjesten")
    private Boolean obavjesten;
    @ManyToOne()
    @JoinColumn(name = "direktorijum_id", referencedColumnName = "id", nullable = false)
    private DirektorijumEntity direktorijum;

}

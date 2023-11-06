package com.example.sigurnost.repository;

import com.example.sigurnost.model.KorisnikEntity;
import com.example.sigurnost.model.enums.Role;
import com.example.sigurnost.model.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface KorisnikRepository extends JpaRepository<KorisnikEntity, Integer> {
    Optional<KorisnikEntity> findByKorisnickoImeAndStatus(String kIme, Status s);

    Boolean existsByKorisnickoImeAndIdNot(String kIme, Integer id);

    KorisnikEntity findByMail(String mail);

    List<KorisnikEntity> findAllByRoleNot(Role x);
}

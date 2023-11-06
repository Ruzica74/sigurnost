package com.example.sigurnost.repository;

import com.example.sigurnost.model.DirektorijumEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DirektorijumRepository extends JpaRepository<DirektorijumEntity, Integer> {

    DirektorijumEntity findDirektorijumEntityById(int id);
}

package com.example.sigurnost.repository;

import com.example.sigurnost.model.FajlEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FajlRepository extends JpaRepository<FajlEntity, Integer> {

    FajlEntity findFajlEntityById(int id);
}

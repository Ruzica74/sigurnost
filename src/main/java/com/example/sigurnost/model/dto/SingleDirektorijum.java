package com.example.sigurnost.model.dto;

import com.example.sigurnost.model.DirektorijumEntity;
import com.example.sigurnost.model.FajlEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;


@Data
public class SingleDirektorijum {
    private List<DirektorijumEntity> direktorijums;
    private List<FajlEntity> files;
}

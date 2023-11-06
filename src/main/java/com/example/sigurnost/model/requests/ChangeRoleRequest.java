package com.example.sigurnost.model.requests;

import com.example.sigurnost.model.enums.Role;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class ChangeRoleRequest {

    @NotNull
    private Role role;
}

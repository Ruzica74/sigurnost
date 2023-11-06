package com.example.sigurnost.model.requests;

import com.example.sigurnost.model.enums.Status;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class ChangeStatusRequest {
    @NotNull
    private Status status;
}

package com.example.sigurnost;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class SigurnostApplication {

    public static void main(String[] args) {
        SpringApplication.run(SigurnostApplication.class, args);
    }

    @Bean
    public ModelMapper getMApper(){
        return new ModelMapper();
    }

}

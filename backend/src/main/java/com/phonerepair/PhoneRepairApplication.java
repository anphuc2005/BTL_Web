package com.phonerepair;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class PhoneRepairApplication {

    public static void main(String[] args) {
        SpringApplication.run(PhoneRepairApplication.class, args);
    }

}

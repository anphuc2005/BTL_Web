package com.phonerepair.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI phoneRepairOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Phone Repair Management API")
                        .description("REST API for Phone Repair Management System")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("PhoneRepair Team")
                                .email("support@phonerepair.com"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")));
    }
}

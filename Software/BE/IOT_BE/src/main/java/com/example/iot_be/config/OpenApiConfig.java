package com.example.iot_be.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
        info = @Info(
                contact = @Contact(
                        name = "Le Trong Duong",
                        email = "duongle157.work@gmail.com",
                        url = "https://github.com/DwngLee"
                ),
                title = "OpenApi specification - Le Trong Duong",
                description = "OpenApi documentation for IOT Project",
                version = "1.0"
        ),
        servers = {
                @Server(
                        description = "Local ENV",
                        url = "http://localhost:8080/api"
                )
        }

)
public class OpenApiConfig {
}

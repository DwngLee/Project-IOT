package com.example.iot_be;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class IotBeApplication {

    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(IotBeApplication.class, args);
    }


}

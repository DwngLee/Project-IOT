package com.example.iot_be;

import com.example.iot_be.mqtt.MqttService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class IotBeApplication {

    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(IotBeApplication.class, args);
        MqttService mqttService = context.getBean(MqttService.class);
        String turnOnLed1 = "1";
        try {
            mqttService.sendMessage("device/led", turnOnLed1);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}

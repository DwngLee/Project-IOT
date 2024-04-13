package com.example.iot_be.websocket;

import com.example.iot_be.config.LocalDateTimeAdapter;
import com.example.iot_be.enity.Action;
import com.example.iot_be.mqtt.MqttConstraint;
import com.example.iot_be.mqtt.MqttService;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;

@Controller
public class WebSocketController {
    @Autowired
    private WebSocketService webSocketService;
    @Autowired
    private MqttService mqttService;
    Gson gson = new GsonBuilder()
            .registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter())
            .create();
    @MessageMapping("/device")
    public void sendAction(@Payload Action action){
        try{
            mqttService.sendMessageToMqtt("device/led", gson.toJson(action));
        }catch (Exception e){
            throw  new RuntimeException(e);
        }
    }

}

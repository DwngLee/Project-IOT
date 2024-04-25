package com.example.iot_be.mqtt;

import com.example.iot_be.config.LocalDateTimeAdapter;
import com.example.iot_be.enity.Action;
import com.example.iot_be.enity.DataSensor;
import com.example.iot_be.repository.ActionRepo;
import com.example.iot_be.repository.DataRepo;
import com.example.iot_be.websocket.WebSocketConstraint;
import com.example.iot_be.websocket.WebSocketService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.eclipse.paho.client.mqttv3.IMqttMessageListener;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class MqttMessageListener implements IMqttMessageListener {
    @Autowired
    private DataRepo dataSensorRepository;
    @Autowired
    private ActionRepo actionRepository;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private WebSocketService webSocketService;
    Gson gson = new GsonBuilder()
            .registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter())
            .create();

    @Override
    public void messageArrived(String topic, MqttMessage message) throws Exception {
        System.out.println("-----------------------------------------------------------------------------------");
        System.out.println("Received message from topic " + topic + ": " + new String(message.getPayload()));
        System.out.println("-----------------------------------------------------------------------------------");
        if (topic.equals(MqttConstraint.DATA_TOPIC)) {
            DataSensor dataSensor = objectMapper.readValue(message.toString(), DataSensor.class);
            LocalDateTime time = LocalDateTime.now();
            dataSensor.setCreatedAt(time);
            dataSensorRepository.save(dataSensor);
        }
        if (topic.equals(MqttConstraint.ACTION_TOPIC)) {
            Action action = objectMapper.readValue(message.toString(), Action.class);
            LocalDateTime time = LocalDateTime.now();
            action.setTime(time);
            actionRepository.save(action);
            webSocketService.sendMessageToClient(WebSocketConstraint.DEVICE_TOPIC, gson.toJson(action));
        }
    }
}


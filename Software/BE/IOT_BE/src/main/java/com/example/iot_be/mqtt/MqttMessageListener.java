package com.example.iot_be.mqtt;

import com.example.iot_be.enity.DataSensor;
import com.example.iot_be.repository.DataRepo;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.eclipse.paho.client.mqttv3.IMqttMessageListener;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MqttMessageListener implements IMqttMessageListener {
    @Autowired
    private DataRepo dataSensorRepository;
    @Autowired
    private ObjectMapper objectMapper;
    @Override
    public void messageArrived(String topic, MqttMessage message) throws Exception {
        DataSensor dataSensor = objectMapper.readValue(message.toString(), DataSensor.class);

        // Lưu đối tượng DataSensor vào cơ sở dữ liệu
        dataSensorRepository.save(dataSensor);
        System.out.println("Received message from topic " + topic + ": " + new String(message.getPayload()));
    }
}


package com.example.iot_be.mqtt;
import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MqttService {

    private final IMqttClient mqttClient;

    @Autowired
    public MqttService(IMqttClient mqttClient) {
        this.mqttClient = mqttClient;
    }

    public void sendMessageToMqtt(String topic, String messageContent) throws Exception {
        MqttMessage message = new MqttMessage(messageContent.getBytes());
        mqttClient.publish(topic, message);
    }
}
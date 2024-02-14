package com.example.iot_be.mqtt;

import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MqttConfig {
    private static final String MQTT_BROKER = "tcp://localhost:1883";
    private static final String CLIENT_ID = "spring-boot-mqtt";
    private static final String SUB_TOPIC = "Tempdata";

    @Autowired
    private MqttMessageListener mqttMessageListener;

    @Bean
    public IMqttClient mqttClient() throws Exception {
        MqttConnectOptions options = new MqttConnectOptions();
        options.setAutomaticReconnect(true);
        options.setCleanSession(true);

        IMqttClient mqttClient = new MqttClient(MQTT_BROKER, CLIENT_ID);
        mqttClient.connect(options);

        mqttClient.subscribe(SUB_TOPIC, mqttMessageListener);

        return mqttClient;
    }
}


package com.example.iot_be.config;

import com.example.iot_be.mqtt.MqttConstraint;
import com.example.iot_be.mqtt.MqttMessageListener;
import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MqttConfig {
    @Autowired
    private MqttMessageListener mqttMessageListener;
    @Bean
    public IMqttClient mqttClient() throws Exception {
        MqttConnectOptions options = new MqttConnectOptions();
        options.setAutomaticReconnect(true);
        options.setCleanSession(true);

        options.setUserName(MqttConstraint.USERNAME);
        options.setPassword(MqttConstraint.PASSWORD.toCharArray());

        IMqttClient mqttClient = new MqttClient(MqttConstraint.MQTT_BROKER, MqttConstraint.CLIENT_ID);
        mqttClient.connect(options);

        mqttClient.subscribe(MqttConstraint.DATA_TOPIC, mqttMessageListener);
        mqttClient.subscribe(MqttConstraint.ACTION_TOPIC, mqttMessageListener);
        mqttClient.subscribe(MqttConstraint.ALERT_TOPIC, mqttMessageListener);

        return mqttClient;
    }
}


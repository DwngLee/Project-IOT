package com.example.iot_be.controller;

import com.example.iot_be.config.LocalDateTimeAdapter;
import com.example.iot_be.enity.Action;
import com.example.iot_be.mqtt.MqttService;
import com.example.iot_be.service.Command;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
public class ActionController {
    @Autowired
    @Qualifier(value = "actionServiceImpl")
    Command actionService;
    @Autowired
    MqttService mqttService;

    Gson gson = new GsonBuilder()
            .registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter())
            .create();

    @GetMapping("/actions")
    public ResponseEntity<List<Action>> getAllAction(){
        return  new ResponseEntity<>(actionService.getAll(), HttpStatus.OK);
    }

    @PostMapping("/actions")
    public ResponseEntity<HttpStatus> saveAction(@RequestBody Action action){
        actionService.save(action);
        String message = gson.toJson(action);
        System.out.println(message);
        try {
            mqttService.sendMessage("device/led", message);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/actions/search")
    public ResponseEntity<List<Action>> searchByTime(@RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")  LocalDateTime startDate,
                                                     @RequestParam("endDate")  @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")  LocalDateTime endDate){
        return new ResponseEntity<>(actionService.findByTime(startDate, endDate), HttpStatus.OK);
    }

}


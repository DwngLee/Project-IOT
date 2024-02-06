package com.example.iot_be.controller;

import com.example.iot_be.enity.Action;
import com.example.iot_be.service.Command;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class ActionController {
    @Autowired
    @Qualifier(value = "actionServiceImpl")
    Command actionService;


    @GetMapping("/actions")
    public ResponseEntity<List<Action>> getAllAction(){
        return  new ResponseEntity<>(actionService.getAll(), HttpStatus.OK);
    }

    @PostMapping("/actions")
    public ResponseEntity<HttpStatus> saveAction(@RequestBody Action action){
        actionService.save(action);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}


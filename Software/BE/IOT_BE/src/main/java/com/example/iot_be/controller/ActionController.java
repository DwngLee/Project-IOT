package com.example.iot_be.controller;

import com.example.iot_be.enity.Action;
import com.example.iot_be.service.Command;
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


    @GetMapping("/actions")
    public ResponseEntity<List<Action>> getAllAction(){
        return  new ResponseEntity<>(actionService.getAll(), HttpStatus.OK);
    }

    @PostMapping("/actions")
    public ResponseEntity<HttpStatus> saveAction(@RequestBody Action action){
        actionService.save(action);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/actions/search")
    public ResponseEntity<List<Action>> searchByTime(@RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                                     @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate){
        return new ResponseEntity<>(actionService.findByTime(startDate.atStartOfDay(), endDate.atTime(23, 59, 59)), HttpStatus.OK);
    }

}


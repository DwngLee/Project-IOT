package com.example.iot_be.controller;

import com.example.iot_be.enity.DataSensor;
import com.example.iot_be.service.Command;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DataController {
    @Autowired
    @Qualifier("dataServiceImpl")
    Command dataSensorService;
    @GetMapping("/data")
    public ResponseEntity<List<DataSensor>> getAllData(){
        return new ResponseEntity<>(dataSensorService.getAll(), HttpStatus.OK);
    }

    @PostMapping("/data")
    public  ResponseEntity<HttpStatus> insertData(@RequestBody DataSensor dataSensor){
        dataSensorService.save(dataSensor);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}

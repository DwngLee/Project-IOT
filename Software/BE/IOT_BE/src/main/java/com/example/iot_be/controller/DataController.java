package com.example.iot_be.controller;

import com.example.iot_be.enity.DataSensor;
import com.example.iot_be.service.DataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class DataController {
    @Autowired
    @Qualifier("dataServiceImpl")
    DataService dataSensorService;
    @GetMapping("/data")

    public ResponseEntity<Page<DataSensor>> getAllData(@RequestParam(name = "page", defaultValue = "0") int pageNo,
                                                       @RequestParam(name = "limit", defaultValue = "5") int limit,
                                                       @RequestParam(name = "minTemp", defaultValue = "0") double minTemp,
                                                       @RequestParam(name = "maxTemp", defaultValue = "100") double maxTemp,
                                                       @RequestParam(name = "minHumid", defaultValue = "0") double minHumid,
                                                       @RequestParam(name = "maxHumid", defaultValue = "100") double maxHumid,
                                                       @RequestParam(name = "minLight", defaultValue = "0") double minLight,
                                                       @RequestParam(name = "maxLight", defaultValue = "1000") double maxLight,
                                                       @RequestParam(name = "startDate", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") LocalDateTime startDate,
                                                       @RequestParam(name = "endDate", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")  LocalDateTime endDate){
        return new ResponseEntity<>(dataSensorService.getAll(pageNo, limit, startDate, endDate, minTemp, maxTemp, minHumid, maxHumid, minLight, maxLight), HttpStatus.OK);
    }

    @PostMapping("/data")
    public  ResponseEntity<HttpStatus> saveData(@RequestBody DataSensor dataSensor){
        dataSensorService.save(dataSensor);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}

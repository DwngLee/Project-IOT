package com.example.iot_be.controller;

import com.example.iot_be.enity.DataSensor;
import com.example.iot_be.service.DataService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Data")
public class DataController {
    @Autowired
    @Qualifier("dataServiceImpl")
    DataService dataSensorService;

    @GetMapping("/data")
    @Operation(description = "Lấy thông tin cảm biến theo các trang tuỳ vào giá trị đầu vào", summary = "Lấy thông tin cảm biến")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lấy thông tin thành công"),
            @ApiResponse(responseCode = "404", description = "Không có thông tin", content = @Content)
    })
    public ResponseEntity<Page<DataSensor>> getAllData(@RequestParam(name = "page", defaultValue = "0") int pageNo,
                                                       @RequestParam(name = "limit", defaultValue = "5") int limit,
                                                       @RequestParam(defaultValue = "0") double minTemp,
                                                       @RequestParam(defaultValue = "100") double maxTemp,
                                                       @RequestParam(defaultValue = "0") double minHumid,
                                                       @RequestParam(defaultValue = "100") double maxHumid,
                                                       @RequestParam(defaultValue = "0") double minLight,
                                                       @RequestParam(defaultValue = "1000") double maxLight,
                                                       @RequestParam(defaultValue = "0") double minDust,
                                                       @RequestParam(defaultValue = "1000") double maxDust,
                                                       @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") LocalDateTime startDate,
                                                       @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") LocalDateTime endDate,
                                                       @RequestParam(defaultValue = "") String keyword,
                                                       @RequestParam(defaultValue = "ALL") String searchBy,
                                                       @RequestParam(defaultValue = "created_at") String sortColumn,
                                                       @RequestParam(defaultValue = "asc") String sortDirection) {
        return new ResponseEntity<>(dataSensorService.getData(pageNo, limit, keyword, searchBy, minTemp, maxTemp, minHumid, maxHumid, minLight, maxLight, minDust, maxDust, sortColumn, sortDirection), HttpStatus.OK);
    }


}

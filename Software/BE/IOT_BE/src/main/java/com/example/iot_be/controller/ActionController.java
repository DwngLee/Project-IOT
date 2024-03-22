package com.example.iot_be.controller;

import com.example.iot_be.config.LocalDateTimeAdapter;
import com.example.iot_be.enity.Action;
import com.example.iot_be.mqtt.MqttService;
import com.example.iot_be.service.ActionService;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Action")
public class ActionController {
    @Autowired
    @Qualifier(value = "actionServiceImpl")
    ActionService actionService;

    @GetMapping("/actions")
    @Operation(summary = "Lấy thông tin về các action", description = "Trả về danh sách các action dưới dạng Pageable")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Tìm kiếm thành công"),
            @ApiResponse(responseCode = "404", description = "Không tìm thấy action", content = @Content)
    })
    public ResponseEntity<Page<Action>> getAllAction( @RequestParam(name = "page", defaultValue = "0") int pageNo,
                                                      @RequestParam(name = "limit", defaultValue = "10") int limit,
                                                      @RequestParam(name = "startDate", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")  LocalDateTime startDate,
                                                      @RequestParam(name = "endDate", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")  LocalDateTime endDate){
        Page<Action> data = actionService.getAll(pageNo, limit, startDate, endDate);
        return  new ResponseEntity<>(data, HttpStatus.OK);
    }
    @PostMapping("/actions")
    @Operation(summary = "Gửi yêu cầu action len phía server")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Gửi yeu cầu action thành công"),
            @ApiResponse(responseCode = "400", description = "Gửi yêu cầu action không thành công", content = @Content)
    })
    public ResponseEntity<HttpStatus> saveAction(@RequestBody Action action){
       actionService.sendAction(action);
       return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/lastaction")
    @Operation(summary = "Lấy ra trạng thái cuối cùng của mỗi thiết bị")
    public ResponseEntity<List<Action>> getLastAction(){
        List<Action> actions =  actionService.getLastAction();
        return  new ResponseEntity<>(actions, HttpStatus.OK);
    }


}


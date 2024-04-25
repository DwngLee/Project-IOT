package com.example.iot_be;
import com.example.iot_be.websocket.WebSocketConstraint;
import com.example.iot_be.websocket.WebSocketService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import java.util.Scanner;

@SpringBootApplication
public class IotBeApplication {

    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(IotBeApplication.class, args);
//        WebSocketService webSocketService = context.getBean(WebSocketService.class);
//        while (true){
//            Scanner sc = new Scanner(System.in);
//            String command = sc.nextLine();
//            if(command.equals("e")){
//                break;
//            }
//            webSocketService.sendMessageToClient(WebSocketConstraint.DEVICE_TOPIC, command);
//        }

    }


}

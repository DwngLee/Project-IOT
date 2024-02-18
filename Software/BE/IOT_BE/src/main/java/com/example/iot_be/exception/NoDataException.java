package com.example.iot_be.exception;

public class NoDataException extends RuntimeException{
    public NoDataException(String message) {
        super("The data about " + message +" does not exist in our record");
    }
}

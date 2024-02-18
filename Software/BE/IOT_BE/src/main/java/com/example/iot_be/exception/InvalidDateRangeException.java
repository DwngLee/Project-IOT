package com.example.iot_be.exception;

public class InvalidDateRangeException extends RuntimeException{
    public InvalidDateRangeException() {
        super("Invalid Date Range");
    }
}

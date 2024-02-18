package com.example.iot_be.constants;
import javax.ejb.Local;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.time.LocalDateTime;

public class DateRangeValidator implements ConstraintValidator<ValidRange, LocalDateTime> {
    @Override
    public void initialize(ValidRange validRange) {

    }

    @Override
    public boolean isValid(LocalDateTime dateRange, ConstraintValidatorContext constraintValidatorContext) {
        if (dateRange == null) {
            return false; // Let @NotNull handle this
        }

//        LocalDateTime startDate = dateRange.getStartDate();
//        LocalDateTime endDate = dateRange.getEndDate();

//        return startDate != null && endDate != null && !startDate.isAfter(endDate);
        return true;
    }
}
package com.example.iot_be.service;

import com.example.iot_be.enity.Action;
import com.example.iot_be.exception.InvalidDateRangeException;
import com.example.iot_be.exception.NoDataException;
import com.example.iot_be.repository.ActionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ActionServiceImpl implements Command<Action> {
    @Autowired
    ActionRepo actionRepo;
    @Override
    public Page<Action> getAll(int pageNo, int limit, LocalDateTime startDate, LocalDateTime endDate) {

        if (startDate != null && endDate != null && endDate.isBefore(startDate)) {
            throw new InvalidDateRangeException();
        }

        if (startDate == null) {
            startDate = LocalDateTime.of(1970, 1, 1, 0, 0);
        }
        if (endDate == null) {
            endDate = LocalDateTime.now();
        }

        Pageable pageable = PageRequest.of(pageNo-1, limit);

        List<Action> list = actionRepo.searchByTime(startDate, endDate);

        if(list.size() == 0){
            throw  new NoDataException("Action");
        }

        int startIndex = (int) pageable.getOffset();
        int endIndex = Math.min((startIndex + pageable.getPageSize()), list.size());

        List<Action> subList = list.subList(startIndex, endIndex);

        return new PageImpl<>(subList, pageable, list.size());
    }

    @Override
    public Page<Action> getAll(int pageNo, int limit, LocalDateTime startDate, LocalDateTime endDate, double minTemp, double maxTemp, double minHumid, double maxHumid, double minLight, double maxLight) {
        return null;
    }


    @Override
    public void save(Action action) {
        actionRepo.save(action);
    }


}

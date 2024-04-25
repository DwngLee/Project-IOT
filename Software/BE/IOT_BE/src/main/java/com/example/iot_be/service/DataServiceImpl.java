package com.example.iot_be.service;

import com.example.iot_be.config.SearchBy;
import com.example.iot_be.enity.DataSensor;
import com.example.iot_be.exception.InvalidDateRangeException;
import com.example.iot_be.exception.NoDataException;
import com.example.iot_be.repository.DataRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Controller
public class DataServiceImpl implements DataService {
    @Autowired
    DataRepo dataSensorRepo;

    @Override
    public Page<DataSensor> getData(int pageNo,
                                    int limit,
                                    String keyword,
                                    String searchBy,
                                    double minTemp,
                                    double maxTemp,
                                    double minHumid,
                                    double maxHumid,
                                    double minLight,
                                    double maxLight,
                                    double minDust,
                                    double maxDust,
                                    String sortColumn,
                                    String sortDirection) {
        //Danh cho trung hop yeu cau search theo thoi gian
//        if (startDate != null && endDate != null && endDate.isBefore(startDate)) {
//            throw new InvalidDateRangeException();
//        }
//        if (startDate == null) {
//            startDate = LocalDateTime.of(1970, 1, 1, 0, 0);
//        }
//        if (endDate == null) {
//            endDate = LocalDateTime.now();
//        }
        List<DataSensor> list = new ArrayList<>();
        Sort.Direction sort = Sort.Direction.DESC;

        if(searchBy.equals("ALL")){
                list = dataSensorRepo.getAllData(keyword, minTemp, maxTemp, minHumid, maxHumid, minLight, maxLight, minDust, maxDust, sortColumn, sortDirection);
        }else{
            list = dataSensorRepo.getDataByFilter(searchBy, keyword, minTemp, maxTemp, minHumid, maxHumid, minLight, maxLight, minDust, maxDust, sortColumn, sortDirection);
        }

        if (list.size() == 0) {
            throw new NoDataException("Data Sensor");
        }

        Pageable pageable = PageRequest.of(pageNo, limit);

        int startIndex = (int) pageable.getOffset();
        int endIndex = (int) Math.min(pageable.getOffset() + pageable.getPageSize(), list.size());
        List<DataSensor> subList = list.subList(startIndex, endIndex);

        return new PageImpl<>(subList, pageable, list.size());
    }

}

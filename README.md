
# IOT Project
Một dự án IOT với mạch ESP8266 về quản lý nhiệt độ, độ ẩm và ánh sáng, kết hợp với bật tắt 02 thiết bị: đèn và quạt:
- Thông tin về nhiệt độ, độ ẩm và ánh sáng sẽ được cảm biến thu lại ở phần cứng. Sau đó thông tin sẽ được xử lý và hiển thị trực quan hoá trên giao diện website người dùng. 
- Người dùng có thể thực hiện chức năng bật/tắt các thiết bị đèn, quạt trên giao diện ứng dụng, các yêu cầu sau đó sẽ được xử lý và gửi về phần cứng để thực hiện yêu cầu.


## Authors

- [@DwngLee](https://github.com/DwngLee)


## Deployment
## ***Server***


**Bước 1: Clone dự án ở repo**

```bash
  git clone https://github.com/DwngLee/Project-IOT.git
```
**Bước 2: Setup Maven (có thể bỏ qua nếu đã cài đặt Maven)**
- Cài đặt maven: ` https://maven.apache.org/download.cgi`
- Giải nén file và lưu vào thư mục
- Set MAVEN_HOME vào `System variable`
![ibo5A](https://github.com/DwngLee/Project-IOT/assets/156188368/8aadced8-9f5c-4a09-9007-b2ddc2b909ff)
- Set path cho maven
![wl0eU](https://github.com/DwngLee/Project-IOT/assets/156188368/e9850992-7115-4b4e-a9cf-e297ab476fd3)
- Thêm maven plugin vào file POM.XML
```bash
   <build>
       <plugins>
         <plugin>
           <groupId>org.springframework.boot</groupId>
           <artifactId>spring-boot-maven-plugin</artifactId>
          </plugin>
        </plugins>
      </build>
```
**Bước 3: Kết nối tới hệ quản trị cơ sở dữ liệu MySQL**
- Chỉnh sửa các thông tin tới database của bạn: url, username, password, driver
![z5275458207180_c80c7ad668658578d771bd71fcbbf30b](https://github.com/DwngLee/Project-IOT/assets/156188368/3d9eaea9-8cc3-4e8d-80b6-b83f0e79f7d1)


**Bước 4: Build Spring Boot Project bằng Maven**
```bash
  mvn package
```
hoặc
```bash
  mvn install / mvn clean install
```
**Bước 5: Chạy ứng dụng Spring Boot sử dụng Maven**
```bash
  mvn spring-boot:run
```
## ***Client***
**Bước 1: Cài node_modules**
```bash
  npm i
```

**Bước 2: Chạy dự án**

```bash
  npm run dev
```

## ***Hardware ESP8266***
**Bước 1: Cài đặt Arduino và setup Arduino**
- Tham khảo cách làm: `http://arduino.vn/bai-viet/68-cai-dat-driver-va-arduino-ide`
**Bước 2: Cài đặt và setup MQTT Broker**
- Tham khảo cách làm: `https://ngocautomation.com/tai-va-cai-dat-mqtt-broker-mosquitto/`
**Bước 3: Kết nối ESP8266 với máy tính**
**Bước 4: Nạp code vào mạch ESP8266**
- Mở code trong thư mục: /Software/Broker/light_on_off/light_on_off.ino bằng Arduino
- Bấm Compile và nạp code


## API Reference

- API docs: https://app.swaggerhub.com/apis-docs/DUONGLE157WORK/open-api_specification_le_trong_duong/1.0#/


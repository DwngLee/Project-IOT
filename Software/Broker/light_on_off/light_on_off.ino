#include <PubSubClient.h>
#include <ESP8266WiFi.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>
#include <TimeLib.h>
#include <ArduinoJson.h>

#define DHTPIN D5      // Digital pin connected to the DHT sensor
#define LDRPIN A0      // Analog pin connected to the LDR sensor
#define DHTTYPE DHT11  // DHT 11

DHT_Unified dht(DHTPIN, DHTTYPE);

uint32_t delayMS;

// Update these with values suitable for your network.

const char *ssid = "Le Trong Tien_Tang2";
const char *password = "21121970";
const char *mqtt_server = "192.168.1.2";
const char *topic = "Tempdata";  //publish topic
WiFiClient espClient;
PubSubClient client(espClient);

unsigned long lastMsg = 0;
String msgStr = "";
float temp, hum;

String getCurrentTime() {
  // Get current time
  time_t now = time(nullptr);

  // Convert time to local time
  struct tm *localTime = localtime(&now);

  // Format time as string (example format: "YYYY-MM-DD HH:MM:SS")
  char timeString[20];
  sprintf(timeString, "%04d-%02d-%02d %02d:%02d:%02d", localTime->tm_year + 1900, localTime->tm_mon + 1,
          localTime->tm_mday, localTime->tm_hour, localTime->tm_min, localTime->tm_sec);
  Serial.println(timeString);
  return String(timeString);
}


void setup_wifi() {

  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {

    Serial.print(".");
    digitalWrite(2, 0);
    delay(200);
    digitalWrite(2, 1);
    delay(200);
  }

  randomSeed(micros());

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char *topic, byte *payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();

  // Switch on the LED if an 1 was received as first character

  if ((char)payload[0] == '0') {
    digitalWrite(D6, LOW);  // Turn the LED on (Note that LOW is the voltage level
    // but actually the LED is on; this is because
    // it is active low on the ESP-01)
  } else if ((char)payload[0] == '1') {
    digitalWrite(D6, HIGH);  // Turn the LED off by making the voltage HIGH
  } else if ((char)payload[0] == '2') {
    digitalWrite(D7, HIGH);  // Turn the LED off by making the voltage HIGH
  } else if ((char)payload[0] == '3') {
    digitalWrite(D7, LOW);  // Turn the LED off by making the voltage HIGH
  }
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Create a random client ID
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    // Attempt to connect
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
      // Once connected, publish an announcement...
      //      client.publish("device/temp", "Temperature value");
      //      client.publish("device/humidity", "humidity value");

      // ... and resubscribe
      client.subscribe("device/led");
      //      client.subscribe("device/led1");
      //      client.subscribe("device/led2");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void setup() {
  //  pinMode(BUILTIN_LED, OUTPUT);     // Initialize the BUILTIN_LED pin as an output
  pinMode(D6, OUTPUT);
  pinMode(D7, OUTPUT);

  dht.begin();
  sensor_t sensor;
  dht.temperature().getSensor(&sensor);

  dht.humidity().getSensor(&sensor);
  delayMS = sensor.min_delay / 1000;

  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);

  configTime(7 * 3600, 0, "pool.ntp.org", "time.nist.gov");

  Serial.println("\nWaiting for time");
  while (!time(nullptr)) {
    Serial.print(".");
    delay(1000);
  }
  Serial.println("");
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  unsigned long now = millis();
  if (now - lastMsg > 2000) {
    lastMsg = now;

    // Get temperature event and print its value.
    sensors_event_t event;
    dht.temperature().getEvent(&event);
    if (isnan(event.temperature)) {
      Serial.println(F("Error reading temperature!"));
    } else {
      Serial.print(F("Temperature: "));
      Serial.print(event.temperature);
      Serial.println(F("°C"));
      temp = event.temperature;
    }
    // Get humidity event and print its value.
    dht.humidity().getEvent(&event);
    if (isnan(event.relative_humidity)) {
      Serial.println(F("Error reading humidity!"));
    } else {
      Serial.print(F("Humidity: "));
      Serial.print(event.relative_humidity);
      Serial.println(F("%"));
      hum = event.relative_humidity;
    }

    // Read LDR sensor value
    int ldrValue = analogRead(LDRPIN);
    Serial.print(F("Light: "));
    Serial.print(ldrValue);
    Serial.println(F("lux"));

    // Get current time
    String currentTime = getCurrentTime();

    // Format message with temperature, humidity, light, and current time
    // msgStr = String(temp) + "," + String(hum) + "," + String(ldrValue) + "," + currentTime;
    // byte arrSize = msgStr.length() + 1;
    // char msg[arrSize];
    // Serial.print("PUBLISH DATA:");
    // Serial.println(msgStr);
    // msgStr.toCharArray(msg, arrSize);
    // client.publish(topic, msg);
    // msgStr = "";
    // delay(50);

    // Create JSON object
    StaticJsonDocument<200> jsonDoc;
    jsonDoc["temperature"] = temp;
    jsonDoc["humidity"] = hum;
    jsonDoc["light"] = analogRead(LDRPIN);
    jsonDoc["created_at"] = getCurrentTime();

    // Serialize JSON to string
    String jsonStr;
    serializeJson(jsonDoc, jsonStr);

    // Publish JSON string to MQTT topic
    client.publish(topic, jsonStr.c_str());

    delay(50);
  }
}

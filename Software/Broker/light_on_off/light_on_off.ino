#include <PubSubClient.h>
#include <ESP8266WiFi.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>
#include <TimeLib.h>
#include <ArduinoJson.h>

#define DHTPIN D5      // Digital pin connected to the DHT sensor
#define LDRPIN A0      // Analog pin connected to the LDR sensor
#define DHTTYPE DHT11
#define LED_1 "den"
#define LED_2 "quat" 

DHT_Unified dht(DHTPIN, DHTTYPE);

uint32_t delayMS;

// Update these with values suitable for your network.

const char *ssid = "Le Trong Tien_Tang2";
const char *password = "21121970";
const char *mqtt_server = "192.168.1.2";
const int mqtt_port =1884;
const char *topic = "Tempdata";  //publish topic
const char *broker_username = "user1";
const char *broker_password = "1234";
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
  Serial.printf(timeString);
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

  // Create a buffer for the incoming JSON data
  char json[length + 1];
  for (unsigned int i = 0; i < length; i++) {
    json[i] = (char)payload[i];
  }
  json[length] = '\0';

  // Parse the JSON
  StaticJsonDocument<200> doc;
  deserializeJson(doc, json);

  // Extract values
  const char* device_name = doc["deviceName"];
  const char* state = doc["action"];

  Serial.print("Device: ");
  Serial.println(device_name);
  Serial.print("Action: ");
  Serial.println(state);

  // Check which device is being controlled
  if (strcmp(device_name, LED_1) == 0) {
    digitalWrite(D6, strcmp(state, "on") == 0 ? HIGH : LOW);
  } else if (strcmp(device_name, LED_2) == 0) {
    digitalWrite(D7, strcmp(state, "on") == 0 ? HIGH : LOW);
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
    if (client.connect(clientId.c_str(), broker_username, broker_password)) {
      Serial.println("connected");
      client.subscribe("device/led");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

void setup() {
  pinMode(D6, OUTPUT);
  pinMode(D7, OUTPUT);

  dht.begin();
  sensor_t sensor;
  dht.temperature().getSensor(&sensor);

  dht.humidity().getSensor(&sensor);
  delayMS = sensor.min_delay / 1000;

  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, mqtt_port);
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
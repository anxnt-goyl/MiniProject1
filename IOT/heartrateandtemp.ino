#include <Wire.h>
#include "MAX30105.h"
#include "heartRate.h"
#include <Adafruit_MLX90614.h>

MAX30105 particleSensor;
Adafruit_MLX90614 mlx = Adafruit_MLX90614();

long lastBeat = 0;
float beatsPerMinute;

void setup() {
  Serial.begin(115200);
  Wire.begin();

  // MLX90614 setup
  if (!mlx.begin()) {
    Serial.println("MLX90614 not found!");
    while (1);
  }

  // MAX30102 setup
  if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) {
    Serial.println("MAX30102 not found!");
    while (1);
  }

  particleSensor.setup();
  particleSensor.setPulseAmplitudeRed(0x0A);
  particleSensor.setPulseAmplitudeGreen(0); // turn off green LED

  Serial.println("Sensors Ready...");
}

void loop() {

  // 🌡️ Temperature (MLX90614)
  float temp = mlx.readObjectTempC();

  // ❤️ Heart Rate (MAX30102)
  long irValue = particleSensor.getIR();

  if (checkForBeat(irValue) == true) {
    long delta = millis() - lastBeat;
    lastBeat = millis();

    beatsPerMinute = 60 / (delta / 1000.0);
  }

  // 📤 Print Data
  Serial.print("Temp: ");
  Serial.print(temp);
  Serial.print(" °C  |  BPM: ");
  Serial.print(beatsPerMinute);

  if (irValue < 50000) {
    Serial.print(" (Place finger)");
  }

  Serial.println();

  delay(1000);
}
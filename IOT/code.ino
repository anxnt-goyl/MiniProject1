#define TRIG1 12
#define ECHO1 26
#define TRIG2 13
#define ECHO2 25

long duration1, duration2;
float distance1, distance2;

int entryCount = 0;
int exitCount = 0;

int state = 0; 
void setup() {
  Serial.begin(115200);

  pinMode(TRIG1, OUTPUT);
  pinMode(ECHO1, INPUT);
  pinMode(TRIG2, OUTPUT);
  pinMode(ECHO2, INPUT);
}

void loop() {

  //sensor1
  digitalWrite(TRIG1, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG1, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG1, LOW);

  duration1 = pulseIn(ECHO1, HIGH, 30000);
  distance1 = duration1 * 0.034 / 2;

  delay(100);

  //sensor2
  digitalWrite(TRIG2, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG2, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG2, LOW);

  duration2 = pulseIn(ECHO2, HIGH, 30000);
  distance2 = duration2 * 0.034 / 2;
  // Serial.print("D1: ");
  // Serial.print(distance1);
  // Serial.print("|D2: ");
  // Serial.println(distance2);

//entry
  if (distance1 < 50 && state == 0) {
    state = 1;
  }

  if (distance2 < 50 && state == 1) {
    entryCount++;
    Serial.print("ENTRY! Count: ");
    Serial.println(entryCount);
    state = 0;
  }
//exit
  if (distance2 < 50 && state == 0) {
    state = 2;
  }
  if (distance1 < 50 && state == 2) {
    exitCount++;
    Serial.print("EXIT! Count: ");
    Serial.println(exitCount);
    state = 0;
  }
  delay(100);
}
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <Adafruit_VL53L0X.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define BUTTON_PIN 0

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);
Adafruit_VL53L0X sensor = Adafruit_VL53L0X();

void setup() {
  pinMode(BUTTON_PIN, INPUT_PULLUP);

  // Inisialisasi OLED
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {  // Gunakan alamat I2C 0x3C
    while (true); // Jika OLED gagal, berhenti di sini
  }
  display.clearDisplay();

  // Teks "MEASURA" - Pusatkan teks di tengah
  display.setTextSize(2); // Saiz besar
  display.setTextColor(SSD1306_WHITE);
  int16_t x1, y1;
  uint16_t width1, height1;
  display.getTextBounds("MEASURA", 0, 0, &x1, &y1, &width1, &height1);
  int xCenter = (SCREEN_WIDTH - width1) / 2;
  display.setCursor(xCenter, 10);
  display.println("MEASURA");

  // Teks "Press Boot to Start"
  display.setTextSize(1); // Saiz kecil
  display.setCursor(10, 40); // Pastikan teks tidak melebihi ruang
  display.println("Press Boot to Start");

  display.display();

  // Inisialisasi sensor
  if (!sensor.begin()) {
    while (true); // Jika sensor gagal, berhenti di sini
  }
  sensor.setMeasurementTimingBudgetMicroSeconds(200000); // Betulkan fungsi penetapan masa pengukuran
}

void loop() {
  // Tunggu sehingga butang ditekan
  if (digitalRead(BUTTON_PIN) == LOW) {
    display.clearDisplay();

    // Teks "Ketinggian Individu" di atas ketinggian
    display.setTextSize(1);
    display.setCursor(0, 0);
    display.println("Ketinggian Individu");

    // Ambil bacaan dari sensor
    uint16_t distance_mm = sensor.readRange(); // Betulkan fungsi bacaan jarak
    int distance_cm = distance_mm / 10;
    int height_cm = 200 - distance_cm;

    // Paparkan ketinggian pada OLED
    display.setTextSize(2);
    int16_t x2, y2;
    uint16_t width2, height2;
    String heightText = String(height_cm) + " cm";
    display.getTextBounds(heightText.c_str(), 0, 0, &x2, &y2, &width2, &height2);
    int xCenterHeight = (SCREEN_WIDTH - width2) / 2;
    display.setCursor(xCenterHeight, 20); // Sesuaikan kedudukan supaya tidak bertindih
    display.println(heightText);

    display.display();
    delay(1000); // Tunggu sebelum bacaan seterusnya
  }
}

# Tämä sovellus pitää olla käynnissä Rasberry Pi että näppäimistö toimii älybussi sovelluksessa.
# Code for Raspberry PI
from pykeyboard import PyKeyboard
import time
from time import sleep
import serial
ser = serial.Serial('/dev/ttyACM0', 9600)
keyboard = PyKeyboard()
while 1:
    button_value = ser.read()
    button_key = (button_value[0] - 48)
    key_str = str(button_key)
    keyboard.press_key(key_str)
    keyboard.release_key(key_str)

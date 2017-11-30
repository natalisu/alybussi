# Tämä sovellus pitää olla käynnissä Rasberry Pi että näppäimistö toimii älybussi sovelluksessa.
#print("Hei Maailma")
# Code for Raspberry PI
from pykeyboard import PyKeyboard
import time
from time import sleep
import serial
ser = serial.Serial('/dev/ttyACM0', 9600)
keyboard = PyKeyboard()
while 1:
    #ser.readline()
    #print (ser.readline())
    ser.read()
    #print (ser.read())
    var1 = ser.read()
    print (var1[0])
    var2 = (var1[0] - 48)
    print (var2)
    string = str(var2)
    keyboard.press_key(string)
    #sleep(1)
    keyboard.release_key(string)

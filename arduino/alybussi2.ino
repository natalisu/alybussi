//Älybussisovellus
// Code for Arduino Uno
void setup() {
  pinMode(2,INPUT);                            // PIN2 is set for input
  pinMode(3,OUTPUT);                        // PIN3 is set for output
  Serial.begin(9600);                             // serial data rate is set for 9600bps(bits per second)
}

void loop() {                                           // execute the loop forever
  if(digitalRead(2)==HIGH) {                 // if button attached to the UNO is pressed
     //digitalWrite(3,HIGH);                         // turn ON the LED at PIN3
     //Serial.println( "1" );        // send "ButtonPressed" string of characters serially out
     //digitalWrite(3,LOW);           // turn OFF the LED
     while(digitalRead(2)==HIGH){
     }
     Serial.print(1);
     delay(200);
  } else if(digitalRead(3)==HIGH) {
     //Serial.println( "2" );
     while(digitalRead(3)==HIGH){
     }
     Serial.print(2);
     delay(200);
  } else if(digitalRead(4)==HIGH) {
     //Serial.println( "3" );
     while(digitalRead(4)==HIGH){
     }
     Serial.print(3);
     delay(200);
  } else if(digitalRead(6)==HIGH) {
     //Serial.println( "4" );
     while(digitalRead(6)==HIGH){
     }
     Serial.print(4);
     delay(200);
  } else if(digitalRead(5)==HIGH) {
     //Serial.println( "5" );
     while(digitalRead(5)==HIGH){
     }
     Serial.print(5);
     delay(200);
  }

}

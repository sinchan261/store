package utils

import (
	"HttpsThree/config"
	"log"
)

func CreateUsers()(bool,error){
  ct:=`CREATE TABLE IF NOT EXISTS USERS(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  age INT
  )`
db:=config.Connect()
defer db.Close()
_,err:=db.Exec(ct)
if err!=nil{
	log.Printf("Error Creating table%v",err)
	return false,err
}
log.Println("Table Users created or already exists");
return true,nil
}
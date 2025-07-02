package config

import (
	"database/sql"
	"fmt"
	"log"
	_ "github.com/lib/pq" 
)

func Connect()(*sql.DB){
	dbString:="postgres://avnadmin:AVNS_MAMCLXdB2mT9PwMUnoc@pg-e54cdbb-sinchang646-9f7e.b.aivencloud.com:22915/defaultdb?sslmode=require"
	db,err:=sql.Open("postgres",dbString);
	if err!=nil{
		log.Fatalf("Error opening database %v",err)
	}
	 if err:=db.Ping();err!=nil{
		log.Fatalf("Database unrechable :%v",err)
	 }
	var current string
	err=db.QueryRow("SELECT NOW()").Scan(&current)
	if err!=nil{
		log.Fatalf("error executing query %v",err)
	}
	fmt.Println("connected successfully! current timr from db:",current)
	return db
}
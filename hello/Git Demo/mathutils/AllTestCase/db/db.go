package db

import (
	"database/sql"
	"fmt"
	"log"
	_ "github.com/lib/pq" 

)

func DbConnect()*sql.DB {
	connection_string :="postgres://avnadmin:AVNS_MAMCLXdB2mT9PwMUnoc@pg-e54cdbb-sinchang646-9f7e.b.aivencloud.com:22915/defaultdb?sslmode=require"
	db, err := sql.Open("postgres", connection_string)
	if err!=nil{
		log.Fatal("Db connection was failed")
	}
	err=db.Ping()
	if err!=nil{
		log.Fatal("Db unreachable")
	}
     fmt.Println("Connected to postgres ")
  return db
}
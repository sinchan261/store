package db

import (
	"database/sql"
	"log"
		_ "github.com/lib/pq" 
)

func Database()(db *sql.DB) {
	connection_string := "postgres://avnadmin:AVNS_MAMCLXdB2mT9PwMUnoc@pg-e54cdbb-sinchang646-9f7e.b.aivencloud.com:22915/defaultdb?sslmode=require"

	db,err:= sql.Open("postgres",connection_string)
	if err!=nil{
		log.Fatal("error due to database create")
	}

err=db.Ping()
if err!=nil{
	log.Fatal("connection failed with database")
}
return db;
}
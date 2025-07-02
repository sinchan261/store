package config

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq" // PostgreSQL driver
)

func Connectdb() *sql.DB {
	connStr := "postgres://avnadmin:AVNS_MAMCLXdB2mT9PwMUnoc@pg-e54cdbb-sinchang646-9f7e.b.aivencloud.com:22915/defaultdb?sslmode=require"

	// Correct driver name is all lowercase
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal("Error opening connection: ", err)
	}

	// Check if database is reachable
	if err := db.Ping(); err != nil {
		log.Fatalf("Database unreachable: %v", err)
	}

	// Test query
	var now string
	err = db.QueryRow("SELECT NOW()").Scan(&now)
	if err != nil {
		log.Fatalf("Error executing test query: %v", err)
	}

	fmt.Println("✅ Connected to database successfully at:", now)
	return db
}

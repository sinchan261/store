package models

import (
	"Fiberr/config"
	"log"
)

type CarStruct struct {
	Id     int `json:"id"`
	Name   string `json:"name"`
	Engine string `json:"engine"`
	Age    string `json:"age"`
}

func CarModels() (bool, error) {
	query := `
	CREATE TABLE IF NOT EXISTS carmodel (
		id SERIAL PRIMARY KEY,
		name TEXT,
		engine TEXT,
		age TEXT
	)
	`

	db := config.Connectdb()
	defer db.Close()

	_, err := db.Exec(query)
	if err != nil {
		log.Printf("❌ Error during table creation: %v", err)
		return false, err
	}

	log.Println("✅ Table 'carmodel' created or already exists")
	return true, nil
}

package models
type User struct {
	Id    int    `json:"id" example:"1"`
	Name  string `json:"name" example:"Saikat"`
	Email string `json:"email" example:"saikat@example.com"`
	Age   int    `json:"age" example:"25"`
}
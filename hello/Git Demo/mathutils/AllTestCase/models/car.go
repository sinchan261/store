package models

import (
	
	"database/sql"
)
type Car struct{
	Id int `json:"id"`
	Name string `json:"name"`
	Engine string`json:"engine"`
}
func Createtable(db *sql.DB)error {
	
		exec := `create table if not exists car(
	id serial primary key,
	name text,
	engine text
	)`
	_,err:=db.Exec(exec)

   return err;
}

func DropTable(db *sql.DB)error{
	query:=`drop table if  exists car`
	_,err:=db.Exec(query)
	return err;
}

func InsertCar(db *sql.DB,name,engine string)(int,error){

	query:=`insert into car(name,engine) values($1,$2) returning id`
     var id int;
	 err:=db.QueryRow(query,name,engine).Scan(&id)

	 return id,err
}

func Getcar(db *sql.DB,id int)(Car,error){
	query:=`select id,name,engine from car where id=$1`
	var car Car;
	err:=db.QueryRow(query,id).Scan(&car.Id,&car.Name,&car.Engine)
	return car,err
}
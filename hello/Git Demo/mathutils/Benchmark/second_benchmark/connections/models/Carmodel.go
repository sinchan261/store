package models

import (
	"database/sql"
	
)
	type Result struct{
		Id int `json:"id"`
		Name string `json:"name"`
	}
func Carmodel(db *sql.DB)error{ 
exec:=`create table  if not exists cars (
id serial primary key,
name text
)`
_,err:=db.Exec(exec)

return err

}

func Insert(db *sql.DB,name string)(int,error){
 exec:=`insert into cars values($1) returning id`
 var id int;
 err:=db.QueryRow(exec,name).Scan(&id)
 return id,err
}
func Getcar(db *sql.DB,id int)(Result,error){
	exec:=`select id ,name from cars where id=$1`
  var result Result;
	err:=db.QueryRow(exec,id).Scan(&result.Id,&result.Name)
	return result,err;
}
func DeleteDb(db *sql.DB)error{
	exec:=`drop table if exists cars
	`
	_,err:=db.Exec(exec)
	return err;
}
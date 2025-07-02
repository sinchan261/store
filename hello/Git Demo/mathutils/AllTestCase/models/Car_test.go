package models

import (
	"AllTestCase/db"
	"database/sql"

	"log"
	"os"
	"testing"

	"github.com/stretchr/testify/assert"
)

var Testdb *sql.DB
func TestMain(m *testing.M) {
  Testdb=db.DbConnect()
    err:=Createtable(Testdb)
  if err!=nil {
	log.Fatal("Error due to create table")
	panic("Failed to create table")
  }
  code:=m.Run()
 err= DropTable(Testdb)
 if err!=nil{
	log.Fatal("Error due to droping a table")
 }
 Testdb.Close()
 os.Exit(code)

}
func TestInsertAndGetCar(t *testing.T){

id,err:=InsertCar(Testdb,"toyota","v8")
if err!=nil{
	log.Fatal("error for inserting data into table")
}
car,erro:=Getcar(Testdb,id);
 if erro!=nil{
	log.Fatal("error for invalid query id")
 }
 assert.Equal(t,"toyota",car.Name)
 assert.Equal(t,"v8",car.Engine)
}
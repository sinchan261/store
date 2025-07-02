package models

import (
	"database/sql"
	"os"
	"testing"
	"main.go/connections/db"
)
var Db *sql.DB
func TestMain(m *testing.M) {
  Db=db.Database();
  err:=Carmodel(Db)
  if err != nil {
    panic("Failed to create table: " + err.Error())
}
  defer Db.Close();
  Code:=m.Run()
  os.Exit(Code)

}
var Id int;
func TestDummy(t *testing.T) {}

func BenchmarkInsert(b *testing.B) {
	for i:=0;i<b.N;i++{
 id, err:=Insert(Db,"saikat")
 b.Logf("Running BenchmarkInsert with b.N = %d", b.N)

  if err!=nil{
	b.Errorf("insertion failed")
  }
  Id=id

	}
}

func BenchmarkGetUsers(b *testing.B) {
	for i := 0; i < b.N; i++ {
		result,err := Getcar(Db,Id)
		b.Logf("Running BenchmarkInsert with b.N = %d", b.N)

		if err != nil {
			b.Errorf("Select failed: %v", err)
		}
		b.Logf("Result: %+v", result)
	}
}
func BenchmarkDeleteUsers(b *testing.B) {
	for i := 0; i < b.N; i++ {
		err := DeleteDb(Db)
		b.Logf("Running BenchmarkInsert with b.N = %d", b.N)

		if err != nil {
			b.Errorf("Delete failed: %v", err)
		}
	}
}
package ma

import (
	"testing"
	"time"
)

func TestAdd(t *testing.T) {
	result := Add(2, 3)       // call the function
	expected := 5             // what you expect
         t.Log("Finished test")
	if result != expected {
		t.Errorf("Expected %d but got %d", expected, result)
	}
	t.Logf("Test is exit in %v",time.Now())
}
func TestSubstract(t *testing.T){
	result:=Substract(9,6)
	if result<0{
		t.Error("Error result due to negative no")
	}
	t.Logf("Substract test is completed");
}
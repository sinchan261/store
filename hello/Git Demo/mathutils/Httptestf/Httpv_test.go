package HttpTestf

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"encoding/json"
	"github.com/stretchr/testify/assert"
)

func TestCar(t *testing.T){
   

	req:=httptest.NewRequest(http.MethodPost,"/car",strings.NewReader(`{"name":"saikat sinchan ghosh","model":"model 3","price":35000}`))
	  req.Header.Set("Content-Type","application/json")
	  rr:=httptest.NewRecorder()
	  handler:=http.HandlerFunc(Httpfunction)
	  handler.ServeHTTP(rr,req)
	  if status:=rr.Code;status!=http.StatusCreated{
	t.Errorf("Expected status code %d, got %d", http.StatusCreated, status)
	  }
	  expected:=`{"message":"car created"}`
	  actual:=strings.TrimSpace(rr.Body.String())
	  if expected!=actual{
		t.Errorf("expected body %s but got %s ",expected,actual)
	  }
}
func TestGetcar(t *testing.T){
	req:=httptest.NewRequest(http.MethodGet,"/cars/1",nil)
	rr:=httptest.NewRecorder();
	handler:=http.HandlerFunc(Getfunction)
	handler.ServeHTTP(rr,req);
	if rr.Code!=http.StatusOK{
		t.Errorf("Expected status 200 ok , got %d",rr.Code)
	}
	expected :=map[string]string{"name":"saikat",
		"middle":"sinchan",
		"last":"Ghosh"}
		var actual map[string]string;
		err:=json.Unmarshal(rr.Body.Bytes(),&actual)
		t.Log(rr.Body)
		if err != nil {
		t.Fatalf("Failed to parse response JSON: %v", err)
	}

	if len(expected) != len(actual) {
		t.Fatalf("Expected %d keys, but got %d", len(expected), len(actual))
	}
	 for k,v:=range expected{
		if actual[k]!=v{
			t.Errorf("For key %s, expected %s but got %s", k, v, actual[k])
		}
	 }
}
func TestRun(t *testing.T){
  test:=[]struct{
	name string
	qp string
	es int
	en string
  }{
	{"Valid ID 1", "1", http.StatusOK, "Tesla"},
		{"Valid ID 2", "2", http.StatusOK, "BMW"},
		{"Invalid ID", "99", http.StatusNotFound, ""},
  }
  for _,tt:=range test{
	t.Run(tt.name,func(t*testing.T){
		req:=httptest.NewRequest(http.MethodGet,"/cars?id="+tt.qp, nil)
		rr:=httptest.NewRecorder();
		handler:=http.HandlerFunc(AllCar)
		handler.ServeHTTP(rr,req)
		assert.Equal(t,tt.es,rr.Code)
		if tt.es==http.StatusOK{
							var body map[string]string
				json.Unmarshal(rr.Body.Bytes(), &body)
				assert.Equal(t, tt.en, body["name"])
		}
	})
  }
}
package main

import "fmt"

type PaymentMethod interface { //interface of paymenttype
	Pay(int) string
}

type CreditCard struct{} //define creditcard struct

type DebitCard struct{} //define DebitCard struct

type upi struct{}
//interface Pattern

func (c *CreditCard) Pay(amount int) string {
	return fmt.Sprintf("%d paid using credit card", amount)
}

func (d*DebitCard) Pay(amount int) string{
	return fmt.Sprintf("%d paid using debit card",amount)
}
func (u*upi) Pay(amount int) string{
	return fmt.Sprintf("%d paid using upi ");
  }

  func GetPaymentMethod(method string)PaymentMethod{
	switch method{
	case "credit":
		return &CreditCard{}
	case "Debit":
		return &DebitCard{}
	case "upi":
		return &upi{}
	default:
		return nil
	}
  }


func main() {
  handler:=GetPaymentMethod("credit");
  if handler!=nil{
	fmt.Println(handler.Pay(500))
  }
}
package main

import "testing"

func concatWithPlus(s1, s2 string) string {
    return s1 + s2
}

func BenchmarkConcatWithPlus(b *testing.B) {
    for i := 0; i < b.N; i++ {
        concatWithPlus("Hello", "World")
    }
}
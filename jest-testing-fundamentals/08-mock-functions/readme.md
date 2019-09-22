# mock functions

a mock function is a special function that registers everytime it is called and with which parameters it has been called, allowing to later assert on those

this comes very useful when we need to assert that a function we don't call directly have been called, and has received the parameters we expect, for example a callback

#encapsulation means hiding data inside the class and allow access through methods
#private is hiding the data
#setter control the modification of private data
#property access the data through the method which act as variable
class bank:
    def __init__(self,balance):
        self.__balance=balance
    def get_balance(self):
        return 
x=10 #global variable
class student:
    def __init__(self,name,age):
        self.name=name
        self.age=age
        print(x)#here x is global so we can acess
class child(student):
    def display(self):
        print(self.name)
        print(self.age)
        print(x)
s1=child("prasanna",19)
s1.display()

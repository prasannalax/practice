#in python public,private,protected are implemend using name mangling
#name mangling which means python changes name of the variable internally to avoid accidently access and ovveride
class student:
    def __init__(self,marks):
        self.__marks=marks#private only access inside class
    def get_marks(self):
        return self.__marks
class grade(student):
    def __init__(self,marks,grades):
        super().__init__(marks)
        self._grades=grades #protected only can access inside class and child class
    def get_grades(self):
        return self._grades
s1=grade(100,1)
s2=student(200)
s1._grades=2#we can modify not strict but it breaks encapsulation
print(s1._grades)
#s2.__marks=100000 it doesnot modify
#print(s2.__marks) not aceesed
print(s1._grades)#python is not strictly unforced
print(s1.get_grades())
print(s1.get_marks())

    
    
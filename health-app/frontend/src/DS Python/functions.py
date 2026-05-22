def call():
    global x #to modify global variable we use global keyword
    print(x)#we can access global variable
    x=x+1
    print(x)
    print(y)
x=10#global variable because it is defined outside the function
y=100#global variable
call()
#positional arguments
def display(name,age):
    print(name,age)
display("prasanna",20)
#display(20,"prasanna")-->data is not valid but it will run without errors
#keyword arguments
def display(name,age):
    print(name,age)
display(name="prasanna",age=20)
#default arguments
def display(name,age=0):#non-default arugument doesnot follow default argument
    print(name,age)
display(name="prasanna")
#arbitary arguments-positional arbitary arguments
def sums(*args):
    print(sum(args))
sums(1,2,34)
#keyword arbitary arguments
def info(**kargs):
    for i,j in kargs.items():
        print(f"{i}:{j}")

info(name="prasanna",age=20)

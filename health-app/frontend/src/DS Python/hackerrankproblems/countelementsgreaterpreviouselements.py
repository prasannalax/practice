
def count(responseTimes):
    # Write your code here
    if len(responseTimes)<=1:
        return 0
    t=0
    c=0
    for i in range(1,len(responseTimes)):
        t+=responseTimes[i-1]
        avg=t//i
        if responseTimes[i]>avg:
            c=c+1
    return c


arr=list(map(int,input().split()))
tc=count(arr)
print(tc)
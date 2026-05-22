def maxsumofhourglass(arr,rows,cols):
    max_sum=-63#here hackerrank constraints each is -9 to 9 and number of elements in hourglass is 7 so min is -9*7
    for i in range(rows-2):
        for j in range(cols-2):
            upper=arr[i][j]+arr[i][j+1]+arr[i][j+2]
            middle=arr[i+1][j+1]
            lower=arr[i+2][j]+arr[i+2][j+1]+arr[i+2][j+2]
            sum=upper+middle+lower
            if sum>max_sum:
                max_sum=sum
    print("maximum sum of hourglass is : ",max_sum)

arr=[]
rows=int(input("enter number of rows"))
cols=int(input("enter number of colums"))
for i in range(rows):
    arr.append(list(map(int,input().split())))
maxsumofhourglass(arr,rows,cols)
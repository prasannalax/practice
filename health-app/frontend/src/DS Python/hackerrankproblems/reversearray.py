def rev(arr):
    return list(reversed(arr))

arr = list(map(int, input().split()))
rever = rev(arr)
#arr.reverse() change original array


with open("output.txt", "w") as f:
    f.write(' '.join(map(str, rever)))
    f.write("\n")

print("Reversed array:", ' '.join(map(str, rever)))
print("output print successful")

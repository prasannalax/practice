#hacker rank problem in data structures

def dynamicArray(n, queries):
    arr = [[] for _ in range(n)]  # Create n empty sequences
    lastAnswer = 0
    result = []

    for query in queries:
        t, x, y = query
        idx = (x ^ lastAnswer) % n

        if t == 1:
            # Append y to the chosen sequence
            arr[idx].append(y)
        elif t == 2:
            # Get the element and update lastAnswer
            lastAnswer = arr[idx][y % len(arr[idx])]
            result.append(lastAnswer)
    
    return result



first_multiple_input = input().rstrip().split()
n = int(first_multiple_input[0])
q = int(first_multiple_input[1])

queries = []
for _ in range(q):
    queries.append(list(map(int, input().rstrip().split())))

result = dynamicArray(n, queries)
print(result)
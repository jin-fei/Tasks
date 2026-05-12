t = int(input())

for _ in range(t):
    x, n = map(int, input().split())

    total_energy = x if n % 2 == 1 else 0
    print(total_energy)
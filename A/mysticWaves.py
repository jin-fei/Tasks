t = int(input())

for _ in range(t):
    x, n = map(int, input().split())
    # 如果 n 是奇数，结果是 x；如果 n 是偶数，结果是 0
    total_energy = x if n % 2 == 1 else 0
    print(total_energy)
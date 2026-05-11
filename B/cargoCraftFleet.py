t = int(input())
for _ in range(t):
    n = int(input())
    if n < 4 or n % 2 != 0:
        print(-1)
        continue

    # 最小数量：尽量用 6 推进器
    b = n // 6
    found = False
    while b >= 0:
        r = n - 6*b
        if r % 4 == 0:
            a = r // 4
            min_crafts = a + b
            found = True
            break
        b -= 1

    if not found:
        print(-1)
        continue

    # 最大数量：尽量用 4 推进器
    a_max = n // 4
    max_crafts = a_max  # 因为 n 是偶数，总能找到组合

    print(min_crafts, max_crafts)
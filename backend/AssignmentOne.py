import random
import re

flag = 0  # while보다 상단에 없으면 작동안함

print("게임을 시작합니다")
while True:

    x = 0
    number = 0
    string = ""
    random_number = int(random.randint(1, 100))

    print("100 이하의 숫자를 입력하세요:")

    try:
        number = int(input())
        if not 1 <= number <= 100:
            print("유효한 범위 내의 숫자를 입력하세요")
            continue
    except ValueError:
        print("유효한 범위 내의 숫자를 입력하세요")
        continue

    while x != number:
        if random_number > number:
            print("up")
            x += 1
            print("숫자를 입력하세요:")
            number = int(input())
        elif random_number < number:
            print("down")
            x += 1
            print("숫자를 입력하세요:")
            number = int(input())
        else:
            print("정답")
            print(f"시도한 횟수 {x}")
            print("다시 하시겠습니까? (y/n):")
            y = str(input())
            if y == 'y':
                print("다시시작합니다.")
                break
            else:
                print("게임을 종료합니다")
                flag = 1
                break

    # break 조건
    if (flag == 1):
        break

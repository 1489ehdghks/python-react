import random

RSP = ["바위", "가위", "보"]
y = ''
win = 0
lose = 0
draw = 0

while True:
    pc = random.choice(RSP)
    print("가위, 바위, 보 중 하나를 선택하세요:")
    user = str(input())

    # 한글로 할거라 아래와 같은 방법을 사용함.
    if user not in RSP:
        print("유효한 입력이 아닙니다")
        print(f"승:{win} 패:{lose} 무승부:{draw} ")
        continue  # while 시작점으로 돌아감

    if user == pc:
        print(f"사용자:{user} 컴퓨터:{pc}")
        print("무승부")
        draw += 1
        print(f"승:{win} 패:{lose} 무승부:{draw} ")
        print("다시 하시겠습니까? (y/n):")
        y = str(input())
        if y != 'y':
            print("게임을 종료합니다")
            exit()
        else:
            print("다시시작합니다.")

    elif (user == '가위' and pc == '보') or (user == '바위' and pc == '가위') or (user == '보' and pc == '바위'):
        print(f"사용자:{user} 컴퓨터:{pc}")
        print("승리!")
        win += 1
        print(f"승:{win} 패:{lose} 무승부:{draw} ")
        print("다시 하시겠습니까? (y/n):")
        y = str(input())
        if y != 'y':
            print("게임을 종료합니다")
            exit()
        else:
            print("다시시작합니다.")

    else:
        print(f"사용자:{user} 컴퓨터:{pc}")
        print("패배...")
        lose += 1
        print(f"승:{win} 패:{lose} 무승부:{draw} ")
        print("다시 하시겠습니까? (y/n):")
        y = str(input())
        if y != 'y':
            print("게임을 종료합니다")
            exit()
        else:
            print("다시시작합니다.")

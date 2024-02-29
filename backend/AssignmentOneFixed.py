import random


def play_game():
    max_try = 0
    random_number = random.randint(1, 100)
    number = 0

    while True:

        print("100 이하의 숫자를 입력하세요:")
        try:
            number = int(input())
        except ValueError:
            print("옳지 않은 값입니다.100 이하의 숫자를 입력하세요")
            continue

        if 1 <= number <= 100:
            max_try += 1
            if random_number > number:
                print("up")

            elif random_number < number:
                print("down")

            else:
                print("정답")
                print(f"시도한 횟수 {max_try}")
                game_restart()
                continue
        else:
            print("100 이하의 숫자를 입력하세요")


def game_restart():
    while True:
        print("다시 하시겠습니까? (y/n):")
        input_ = input()
        if input_ == 'y':
            print("다시시작합니다.")
            break
        else:

            exit()


def play_RSP():
    while True:
        print("게임을 시작합니다")
        play_game()


play_RSP()

# dog2 객체에 클래스 dog에서의 __init__생성자를 통해서 인스턴스화 했습니다.
# dir((a)). 클래스 안의 메소드와 매직메소드를 전부 보여줌.


class Member():
    def __init__(self, name, username, password):
        self.name = name
        self.username = username
        self.password = password

    def display(self):
        print(f'이름 : {self.name} 닉네임 {self.username}')


class Post():
    def __init__(self, title, contents, author):
        self.title = title
        self.contents = contents
        self.author = author

    def display(self):
        print(f'제목: {self.title}, 내용: {self.contents}, 작성자: {self.author}')


members = []

# member
kim = Member('kim', 'ModeExplorer', 456456)
lee = Member('lee', 'hasty', 123123)
park = Member('park', 'parkGOON', 789789)

members.append(kim)
members.append(lee)
members.append(park)

for x in members:
    x.display()

print(members)


posts = []
# post
authors = ['kim', 'lee', 'park']
for i in range(1, 20):
    title = f'{i}번째'
    contents = f'{i}등이야'
    author_index = i % 3
    author = authors[author_index]

    post = Post(title, contents, author)
    posts.append(post)


print(posts[0].author)

for post in posts:
    if post.author == 'kim':
        post.display()

for x in posts:
    if '2등' in x.contents:
        x.display()

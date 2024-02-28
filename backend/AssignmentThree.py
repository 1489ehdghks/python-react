import os
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
import random

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=['http://localhost:3000'])
login_manager = LoginManager()
login_manager.init_app(app)

basedir = os.path.abspath(os.path.dirname(__file__))
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + \
    os.path.join(basedir, "database.db")
db = SQLAlchemy(app)
app.config['SECRET_KEY'] = os.urandom(24)


# DB


class Member(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(12), nullable=False)
    userID = db.Column(db.String(12), unique=True, nullable=False)
    userPassword = db.Column(db.String(80), nullable=False)

    def display(self):
        print(f"Username: {self.username}")

    def get_userID(self):
        return self.userID

    def __repr__(self):
        return f"USER: {self.userID} = {self.username}"


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    author = db.Column(db.String(12), db.ForeignKey(
        'member.username'), nullable=False)


class GameHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    computer_choice = db.Column(db.String(100), nullable=False)
    user_choice = db.Column(db.String(100), nullable=False)
    result = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(12), db.ForeignKey(
        'member.username'), nullable=False)
    time = db.Column(db.DateTime, default=datetime.utcnow)


# 로그인 관련
@login_manager.user_loader
def load_user(user_id):
    user = Member.query.get(int(user_id))
    print("load_user:", user)
    return user


# 라우트
# 회원가입
@app.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.get_json()

        # 유효성 검사
        if not data or not data.get('username') or not data.get('userID') or not data.get('userPassword'):
            return jsonify({"error": "못찾겠당"})

        # userID 또는 username이 이미 존재하는지 확인
        if Member.query.filter((Member.userID == data['userID']) | (Member.username == data['username'])).first():
            return jsonify({"error": "같은 닉네임 혹은 아이디가 존재합니다"})

        new_member = Member(
            username=data['username'],
            userID=data['userID'],
            userPassword=generate_password_hash(data['userPassword'])
        )
        db.session.add(new_member)
        db.session.commit()
        return jsonify({"message": "User registered successfully"})
    except Exception as e:
        return jsonify({"error": str(e)})


# 포스트생성
@app.route('/api/posts', methods=['POST'])
@cross_origin(supports_credentials=True, origins=['http://localhost:3000'])
@login_required
def create_post():
    try:
        print("current_user:", current_user.username)
        if not current_user.is_authenticated:
            print("current_user1111111:", current_user)
            return jsonify({"error": "로그인이 필요합니다."})

        try:
            print("2222222")
            data = request.get_json()

            new_post = Post(
                title=data['title'],
                content=data['content'],
                author=current_user.username
            )
            db.session.add(new_post)
            db.session.commit()

            return jsonify({"message": "Post created successfully"}), 201
        except Exception as e:
            return jsonify({"error222222222": str(e)})
    except Exception as e:
        return jsonify({'error1111111111': '11111111'})


# 포스트 조회

@app.route('/api/posts', methods=['GET'])
@cross_origin(supports_credentials=True, origins=['http://localhost:3000'])
def get_posts():
    try:
        posts = Post.query.all()
        posts_data = [{'id': post.id, 'title': post.title,
                       'content': post.content, 'author': post.author} for post in posts]
        return jsonify(posts_data)
    except Exception as e:
        return jsonify({"error": str(e)})


# 로그인
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    userID = data.get('userID')
    password = data.get('password')

    # 데이터베이스에서 사용자 찾기
    user = Member.query.filter_by(userID=userID).first()

    # 사용자가 존재하고 비밀번호가 일치하는 경우
    if user and check_password_hash(user.userPassword, password):
        login_user(user)
        print("user:", user)
        return jsonify({"message": "Login successful", "user": {"userID": user.userID}})

    else:
        return jsonify({"message": "Invalid userID or password"})


# 가위바위보하기
@app.route('/game', methods=['POST'])
@cross_origin(supports_credentials=True, origins=['http://localhost:3000'])
def play_RSP():
    choices = ["바위", "가위", "보"]
    data = request.json
    user_choice = data.get('user_choice')
    username = data.get('username')
    computer_choice = random.choice(choices)

    # 유효한 username이 제공되었는지 확인
    if not username:
        return jsonify({'error': 'username은 필수입니다.'})

    if user_choice not in choices:
        return jsonify({'error': '옳지 않은 입력값'})

    if user_choice == computer_choice:
        result = '무승부'
    elif (user_choice == '가위' and computer_choice == '보') or (user_choice == '바위' and computer_choice == '가위') or (user_choice == '보' and computer_choice == '바위'):
        result = '승리'
    else:
        result = '패배'

    game_histort = GameHistory(
        computer_choice=computer_choice,
        user_choice=user_choice,
        result=result,
        username=username
    )
    db.session.add(game_histort)
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)})

    return jsonify({
        'computer_choice': computer_choice,
        'user_choice': user_choice,
        'result': result,
    })

# 가위바위보 결과값


@app.route('/game', methods=['GET'])
@cross_origin(supports_credentials=True, origins=['http://localhost:3000'])
def get_games():
    try:
        games = GameHistory.query.all()
        games_data = [{'id': game.id, 'computer_choice': game.computer_choice,
                       'user_choice': game.user_choice, 'result': game.result, 'username': game.username, 'time': game.time} for game in games]
        return jsonify(games_data)
    except Exception as e:
        return jsonify({"error": str(e)})


# 실행
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)

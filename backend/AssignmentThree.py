import os
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
login_manager = LoginManager(app)
login_manager.init_app(app)

basedir = os.path.abspath(os.path.dirname(__file__))
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + \
    os.path.join(basedir, "database.db")
db = SQLAlchemy(app)
app.config['SECRET_KEY'] = os.urandom(24)
CORS(app, supports_credentials=True)


# DB
class Member(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(12), nullable=False)
    userID = db.Column(db.String(12), unique=True, nullable=False)
    userPassword = db.Column(db.String(80), nullable=False)

    def display(self):
        print(f"Username: {self.username}")


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    author = db.Column(db.String(12), db.ForeignKey(
        'member.username'), nullable=False)


def load_user(user_id):
    return Member.query.get(int(user_id))


# 라우트

# 회원가입
@app.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.get_json()

        # 유효성 검사
        if not data or not data.get('username') or not data.get('userID') or not data.get('userPassword'):
            return jsonify({"error": "못찾겠당"}), 400

        # userID 또는 username이 이미 존재하는지 확인
        if Member.query.filter((Member.userID == data['userID']) | (Member.username == data['username'])).first():
            return jsonify({"error": "같은 닉네임 혹은 아이디가 존재합니다"}), 409

        new_member = Member(
            username=data['username'],
            userID=data['userID'],
            userPassword=generate_password_hash(data['userPassword'])
        )
        db.session.add(new_member)
        db.session.commit()
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# 포스트생성
@app.route('/api/posts', methods=['POST'])
@login_required
def create_post():
    if not current_user.is_authenticated:
        return jsonify({"error": "로그인이 필요합니다."}), 401

    try:
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
        return jsonify({"error": str(e)}), 500


# 로그인 관련
@login_manager.user_loader
def load_user(user_id):
    return Member.query.get(int(user_id))


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
        return jsonify({"message": "Login successful", "user": {"userID": user.userID}}), 200
    else:
        return jsonify({"message": "Invalid userID or password"}), 401


# 실행
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)

from flask import Blueprint, jsonify, request
from app.models import db
from flask_login import login_required, current_user
from app.models import Post, Comment, db
from app.forms import NewPostForm
from app.forms.comment_form import NewCommentForm
from sqlalchemy import desc


post_routes = Blueprint('posts', __name__)


# GET /api/posts/:id
@post_routes.route('/<int:id>')
def get_post(id):
    post = Post.query.get(id)
    return post.to_dict()


# GET /api/posts
@post_routes.route('/')
def get_feed():
    posts = Post.query.all()
    return {'posts': [post.to_dict() for post in posts]}

# POST /api/posts
@post_routes.route('/', methods=["POST"])
@login_required
def new_post():
    data = request.json
    form = NewPostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post(
            user_id=data['user_id'],
            imgURL=form.data['imgURL'],
            caption=form.data['caption']
        )
        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    return (form.errors)


# PUT /api/posts/:id
@post_routes.route('/<id>', methods=["PUT"])
@login_required
def update_post(id):
    form = NewPostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        post = Post.query.get(id)
        post.caption = form.data['caption']
        db.session.commit()
        return {'post': post.to_dict()}
    return (form.errors)

# GET /api/postsrandom
@post_routes.route('/random-order-posts')
def get_random_posts():
    posts = Post.query.all()
    allPosts = [post.to_dict() for post in posts]
    random.shuffle(allPosts)
    return {'allrandomposts': allPosts}


# DELETE /api/posts/:id
@post_routes.route('/<id>', methods=["DELETE"])
@login_required
def delete_post(id):
    post = Post.query.get(id)
    db.session.delete(post)
    db.session.commit()
    return "Post deleted"


#### COMMENTS

# GET /api/posts/:id/comments
@post_routes.route('/<int:id>/comments')
def get_posts_comments(id):
    comments = Comment.query.filter(Comment.post_id==id).all()
    return {'comments': [comment.to_dict() for comment in comments]}


# POST /api/posts/:id/comments
@post_routes.route('/<int:id>/comments', methods=["POST"])
@login_required
def new_comment(id):
    data = request.json
    form = NewCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            user_id=data['user_id'],
            post_id=data['post_id'],
            comment_text=form.data['comment_text']
        )
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    return (form.errors)

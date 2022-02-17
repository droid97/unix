from flask import Blueprint, jsonify, request
from app.models import db
from flask_login import login_required
from app.models import Comment
from app.forms.comment_form import NewCommentForm

comment_routes = Blueprint('comments', __name__)



# /api/comments/:commentId

@comments_routes.route('/')
    comments = Comment.query.all()
    return {'comments': [comment.to_dict() for comment in comments]}

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

#/api/comments/:commentId
@comments_routes.route('/<id>', methods=["PUT"])
@login_required
def update_comment(id):
    form = NewCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment.query.get(id)
        comment.comment_text = form.data['comment_text']
        db.session.commit()
        return {'comment': comment.to_dict()}
    return "comment update"


# /api/comments/:commentId
@comments_routes.route('/<id>', methods=["DELETE"])
@login_required
def delete_comment(id):
    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return "Post deleted"

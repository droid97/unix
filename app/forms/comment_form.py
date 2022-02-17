from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField
from wtforms.validators import DataRequired, ValidationError


class NewCommentForm(FlaskForm):
    comment_text = TextAreaField('Comment', validators=[DataRequired()])
    submit = SubmitField('Submit')

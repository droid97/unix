from app.models import db, Post


def seed_posts():
    demoPost1 = Post(
        user_id=1,
        imgURL='https://mcdn.wallpapersafari.com/medium/88/0/Rlh4m3.jpg',
        caption="Games don't make you violent, lag does.")
    demoPost2 = Post(
        user_id=1,
        imgURL='https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
        caption="I'm not a player. I'm a gamer. Players get chicks. I get achievements.")
    demoPost3 = Post(
        user_id=1,
        imgURL='https://images.unsplash.com/photo-1627855437292-7efeee237b12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=985&q=80',
        caption="Failure doesn't mean the game is over, it means try again with experience.")
    demoPost4 = Post(
        user_id=1,
        imgURL='https://images.unsplash.com/photo-1558008258-7ff8888b42b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80',
        caption="What doesn't kill me, gives me EXP.")

    marniePost1 = Post(
        user_id=2,
        imgURL='https://images.unsplash.com/photo-1627856013841-4845e538d3ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        caption="I don't need to get a life. I'm a gamer I have lots of lives.")
    marniePost2 = Post(
        user_id=2,
        imgURL='https://images.unsplash.com/photo-1527690789675-4ea7d8da4fe3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1092&q=80',
        caption="Home is where you are 'Player 1'.")
    marniePost3 = Post(
        user_id=2,
        imgURL='https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
        caption="Eat. Sleep. Game. Repeat.")
    marniePost4 = Post(
        user_id=2,
        imgURL='https://images.unsplash.com/photo-1529154691717-3306083d869e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        caption="I don't have birthdays. I level up!")
    marniePost5 = Post(
        user_id=2,
        imgURL='https://images.unsplash.com/photo-1529154691717-3306083d869e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        caption="5:00AM the hour when the legends are either waking up or going to sleep.")


    bobbiePost1 = Post(
        user_id=3,
        imgURL='https://images.unsplash.com/photo-1507457379470-08b800bebc67?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1209&q=80',
        caption="If someone pauses their game just to text you back, marry them.")
    bobbiePost2 = Post(
        user_id=3,
        imgURL='https://images.unsplash.com/photo-1616070698578-e5e634af7e8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        caption="Education is important, but video games are importanter.")
    bobbiePost3 = Post(
        user_id=3,
        imgURL='https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        caption="Tips on how to talk to someone while they're gaming: Don't.")




    db.session.add(demoPost1)
    db.session.add(demoPost2)
    db.session.add(demoPost3)
    db.session.add(demoPost4)

    db.session.add(marniePost1)
    db.session.add(marniePost2)
    db.session.add(marniePost3)
    db.session.add(marniePost4)
    db.session.add(marniePost5)

    db.session.add(bobbiePost1)
    db.session.add(bobbiePost2)
    db.session.add(bobbiePost3)




    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()

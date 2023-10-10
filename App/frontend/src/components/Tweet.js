import React, {useEffect, useState} from 'react';
// import {Link} from 'react-router-dom';

function Users() {
    useEffect( () => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const data = await fetch('https://servertest.valerietshiani.co.za/Users');
        const items = await data.json();
        setItems(items);
    };

    return(
        <section>
            <div class="container-fluid">
                <h1 class="mt-5">Tweets</h1>
                <form method="POST" action="https://servertest.valerietshiani.co.za/addTweet">
                    <div class="input-group justify-content-center">
                        <div class="input-group-prepend">
                            <input type="text" name="tweetInput" class="form-control" />
                            <input type="submit" value="Send" class="btn btn-primary mb-2" />
                        </div>
                    </div>
                </form>

                {
                items.map(item => (
                    <div class="row padding">
                        <div class="alert alert-info rounded-pill" role="alert">
                            <i class="fa fa-user mr-2"></i> <i>{item.fullname} ({item.username}): {item.tweet}</i>
                        </div>
                    </div>       
                ))
                }
            </div>
        </section>
    );
}

export default Tweet;
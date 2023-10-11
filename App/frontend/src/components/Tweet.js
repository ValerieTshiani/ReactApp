import React, {useEffect, useState} from 'react';
// import {Link} from 'react-router-dom';
import axios from 'axios';

function Tweet() {
    useEffect( () => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const data = await fetch('https://servertest.valerietshiani.co.za/tweets');
        const items = await data.json();
        setItems(items);
    };

    const [message, setMessage] = useState('');
    const [visible, setVisible] = useState(false);
    const [tweetInput, setTweetInput] = useState('');
    //Submit tweet
    const handleSubmit = async (e) => {
        e.preventDefault();
        const tweetInput = e.target.tweetInput.value;
        try {
          const response = await axios.post('https://servertest.valerietshiani.co.za/addTweet', { tweetInput });  /// cant use both fetch and axios - change
          setMessage(response.data.message);
          setTweetInput(''); // Clear the input field
        } catch (error) {
          setMessage('An error occurred while adding the tweet');
        }

      };

      //timer for the message
      useEffect(() => {
        if (message) {
          setVisible(true);
          const timer = setTimeout(() => {
            setVisible(false);
          }, 3000); // 5000 milliseconds = 5 seconds
    
          return () => {
            clearTimeout(timer);
          };
        }
      }, [message]);

    return(
        <section>
            <div class="container-fluid">
                <h1 class="mt-5">Tweets</h1>
                <form method="POST" action="/addTweet" onSubmit={handleSubmit}>
                    <div class="input-group justify-content-center">
                        <div class="input-group-prepend">
                            <input type="text" name="tweetInput" class="form-control"  value={tweetInput}onChange={(e) => setTweetInput(e.target.value)} />
                            <input type="submit" value="Send" class="btn btn-primary mb-2" />
                        </div>
                    </div>
                </form>
                {visible && message && message.trim() !== '' && (
                        <p className="alert alert-info rounded-pill">
                        {message}
                        </p>
                    )}
                {
                items.map(item => (
                    <div class="row padding">
                        <div class="card m-2 " style={{ width: "80%" }}>
                            <i class="fa fa-user mr-2"></i> 
                            <i class="card-body">
                                <div> <b> first name </b> {item.firstname} </div>
                                <div> <b> Username </b> {item.username} </div>
                                <div> <b> This is the tweet </b>  :  <p style = {{color: "darkgreen"}}> {item.tweet}</p>  </div>
                            </i>
                        </div>
                    </div>       
                ))
                }
            </div>
        </section>
    );
}

export default Tweet;
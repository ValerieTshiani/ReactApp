import React, {useEffect, useState} from 'react';
// import {Link} from 'react-router-dom';

function User() {
    useEffect( () => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const data = await fetch('/users');
        const items = await data.json();
        setItems(items);
    };
    // const fetchUser = async () => {
    //     const user = await fetch('/getSingleUser');
    //     const user_items = await user.json();
    //     setItems(user_items);
    // };
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const [isEditing, setIsEditing] = useState(false);

    const editClick = () => {
        setIsEditing(!isEditing);
    };

    return(
        <section>
            <div class="container-fluid">
                <h1 class="mt-5">Users</h1>
                <button onClick={toggleForm} class="btn btn-primary mb-2"> {showForm ? 'Close Form to add user' : 'Show Form to add user'} </button>
                <br></br>
                {showForm && (
                    <form method="POST" action="/addUser">
                        <div class="input-group justify-content-center">
                        <div>
                                <div style={{padding: "10px"}}>
                                    <label>First Name: </label>
                                     <input type="text" name="firstname" class="form-control"/>
                                    
                                </div>
                                <div style={{padding: "10px"}}>
                                    <label>Last Name: </label>
                                     <input type="text" name="lastname" class="form-control"/>
                                    
                                </div>
                                <div style={{padding: "10px"}}>
                                    <label> Email: </label>
                                    <input type="text" name="email" class="form-control" />
                                    
                                </div>
                                <div style={{padding: "10px"}}>
                                    <label>Cell phone Number: </label>
                                    <input type="text" name="cellphone" class="form-control" />
                                </div>
                                <div style={{padding: "10px"}}>
                                    <label> User Name: </label>
                                    <input type="text" name="username" class="form-control" />
                                    
                                </div>
                                
                                <input type="submit" value="AddUser" class="btn btn-primary mb-2"  style={{padding: "10px"}}/>
                            </div>
                        </div>
                    </form>
                )}
               {/* -------------------------------------User list------------------------------- */}
                {
                items.map(item => (
                    <div class="row padding">
                        <div class="alert alert-info" role="alert">
                            <i class="fa fa-user mr-2"></i>
                             <i> 
                               <div>ID : {item.id}  {}</div>
                                <div>first name : {item.firstname} </div>
                                <div>last name : {item.lastname} </div>
                                <div>email name : {item.email}  </div>
                                <div>cellphone : {item.cellphone} </div>
                                <div>user name : {item.username} </div>
                                <div>loaded first on  : ({item.entry_date}) </div>
                            </i> 
                            <form method="POST" action="/deleteUser"> 
                                <input type="hidden" name="userid" value={item.id} />
                                <input type="submit" value="Delete User" class="btn btn-primary mb-2"  style={{padding: "10px"}}/>
                            </form>
                            <button onClick={editClick} class="btn btn-primary mb-2"> {isEditing ? 'Close form to edit user' : 'Edit user'} </button>
                            
    
                            <div>
                                {isEditing && (
                                    <form method="POST" action="/editUser">
                                        <div class="input-group justify-content-center">
                                        <div>
                                                <input type="hidden" name="userid" value={item.id} />
                                                <div style={{padding: "10px"}}>
                                                    <label>First Name: </label>
                                                    <input type="text" name="firstname" defaultValue={item.firtname} class="form-control"/>
                                                    
                                                </div>
                                                <div style={{padding: "10px"}}>
                                                    <label>Last Name: </label>
                                                    <input type="text" name="lastname" defaultValue={item.lastname} class="form-control"/>
                                                    
                                                </div>
                                                <div style={{padding: "10px"}}>
                                                    <label> Email: </label>
                                                    <input type="text" name="email"  defaultValue={item.email} class="form-control" />
                                                    
                                                </div>
                                                <div style={{padding: "10px"}}>
                                                    <label>Cell phone Number: </label>
                                                    <input type="text" name="cellphone"  defaultValue={item.cellphone} class="form-control" />
                                                </div>
                                                <div style={{padding: "10px"}}>
                                                    <label> User Name: </label>
                                                    <input type="text" name="username" defaultValue={item.username} class="form-control" />
                                                    
                                                </div>
                                                <div style={{padding: "10px"}}>
                                                    <label> Password: </label>
                                                    <input type="text" name="password" defaultValue={item.password} class="form-control" />
                                                    
                                                </div>
                                                
                                                <input type="submit" value="Save edits" class="btn btn-primary mb-2"  style={{padding: "10px"}}/>
                                            </div>
                                        </div>
                                    </form>
                                 )}
                            </div>
                        </div>
                    </div>       
                ))
                }
            </div>
        </section>
    );
}

export default User;
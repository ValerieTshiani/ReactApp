import React, {useEffect, useState} from 'react';
// import {Link} from 'react-router-dom';

function User() {
    useEffect( () => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const data = await fetch('https://servertest.valerietshiani.co.za/users');
        const items = await data.json();
        setItems(items);
    };
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const [editingItemId, setEditingItemId] = useState(false);

    const editClick = (itemId) => {
        if (editingItemId === itemId) {
            setEditingItemId(null);
        } else {
            setEditingItemId(itemId);
        }
    };

    return(
        <section>
            <div className="container-fluid">
                <h1 className="mt-5">Users</h1>
                <button onClick={toggleForm} className="btn btn-primary mb-2"> {showForm ? 'Close Form to add user' : 'Show Form to add user'} </button>
                <br></br>
                {showForm && (
                    <form method="POST" action="https://servertest.valerietshiani.co.za/addUser">
                        <div className="input-group justify-content-center">
                        <div>
                                <div style={{padding: "10px"}}>
                                    <label>First Name: </label>
                                     <input type="text" name="firstname" className="form-control"/>
                                    
                                </div>
                                <div style={{padding: "10px"}}>
                                    <label>Last Name: </label>
                                     <input type="text" name="lastname" className="form-control"/>
                                    
                                </div>
                                <div style={{padding: "10px"}}>
                                    <label> Email: </label>
                                    <input type="text" name="email" className="form-control" />
                                    
                                </div>
                                <div style={{padding: "10px"}}>
                                    <label>Cell phone Number: </label>
                                    <input type="text" name="cellphone" className="form-control" />
                                </div>
                                <div style={{padding: "10px"}}>
                                    <label> User Name: </label>
                                    <input type="text" name="username" className="form-control" />
                                    
                                </div>
                                
                                <input type="submit" value="AddUser" className="btn btn-primary mb-2"  style={{padding: "10px"}}/>
                            </div>
                        </div>
                    </form>
                )}
               {/* -------------------------------------User list------------------------------- */}
                {
                items.map(item => (
                    <div key={item.id} className="row padding card m-2  " style = {{width : "500px"}}>
                        <div>
                            <i className="fa fa-user  card m-2 " ></i>
                             <i className = "card-body"> 
                               <div>ID : {item.id}  {}</div>
                                <div>first name : {item.firstname} </div>
                                <div>last name : {item.lastname} </div>
                                <div>email name : {item.email}  </div>
                                <div>cellphone : {item.cellphone} </div>
                                <div>user name : {item.username} </div>
                                <div>loaded first on  : ({item.entry_date}) </div>
                            </i> 
                            <form method="POST" action="https://servertest.valerietshiani.co.za/deleteUser"> 
                                <input type="hidden" name="userid" value={item.id} />
                                <input type="submit" value="Delete User" className="btn btn-primary mb-2"  style={{padding: "10px"}}/>
                            </form>
                            <button onClick={() => editClick(item.id)} className="btn btn-primary mb-2"> { editingItemId === item.id ? 'Close form to edit user' : 'Edit user'} </button>
                            
    
                            <div>
                                {editingItemId === item.id &&  (
                                    <form method="POST" action="https://servertest.valerietshiani.co.za/editUser">
                                        <div className="input-group justify-content-center">
                                        <div>
                                                <input type="hidden" name="userid" value={item.id} />
                                                <div style={{padding: "10px"}}>
                                                    <label>First Name: </label>
                                                    <input type="text" name="firstname" defaultValue={item.firstname} className="form-control"/>
                                                    
                                                </div>
                                                <div style={{padding: "10px"}}>
                                                    <label>Last Name: </label>
                                                    <input type="text" name="lastname" defaultValue={item.lastname} className="form-control"/>
                                                    
                                                </div>
                                                <div style={{padding: "10px"}}>
                                                    <label> Email: </label>
                                                    <input type="text" name="email"  defaultValue={item.email} className="form-control" />
                                                    
                                                </div>
                                                <div style={{padding: "10px"}}>
                                                    <label>Cell phone Number: </label>
                                                    <input type="text" name="cellphone"  defaultValue={item.cellphone} className="form-control" />
                                                </div>
                                                <div style={{padding: "10px"}}>
                                                    <label> User Name: </label>
                                                    <input type="text" name="username" defaultValue={item.username} className="form-control" />
                                                    
                                                </div>
                                                <div style={{padding: "10px"}}>
                                                    <label> Password: </label>
                                                    <input type="text" name="password" defaultValue={item.password} className="form-control" />
                                                    
                                                </div>
                                                
                                                <input type="submit" value="Save edits" className="btn btn-primary mb-2"  style={{padding: "10px"}}/>
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
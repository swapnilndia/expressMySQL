const form = document.querySelector('form');
// console.log(form);
const ul = document.querySelector('ul');
// console.log(ul);

form.addEventListener('submit', onSubmit);

async function onSubmit(e){
    e.preventDefault();

    const myObj = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value 
    } 
    // console.log(myObj);


    if(form.dataset.userId){
        try{
            let userId = form.dataset.userId;
            const response = await axios.put('http://localhost:3000/user/update-user/'+userId, myObj);
            console.log(response);
            getUserDetails();
            exitEditMode();
        } catch(err){
            console.log(err);
        }
    } else{ // not in edit mode...
        try{
            const response = await axios.post('http://localhost:3000/user/add-user',myObj);
            console.log(response);
            // getUserDetails();
        } catch(err){
            console.log(err);
        }
    }


    // clear fields...
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
}

function enterEditMode(userId){
    form.dataset.userId = userId; // Set the user ID as a data attribute of the form
    document.getElementById("update").style.display = "block"; // Show the Update button
    document.getElementById("submit").style.display = "none"; // Hide the Get A Call button
}

function exitEditMode(){
    delete form.dataset.userId; // Remove the user ID from the form's data attribute
    document.getElementById("update").style.display = "none"; // Hide the Update button
    document.getElementById("submit").style.display = "block"; // Show the Get A Call button
}

async function getUserDetails(){
    try{  
        try{
            const response = await axios.get("http://localhost:3000/user/get-user");
            console.log(response);
    
            const users = response.data.allUsers; // Extract the users array from the response
    
            ul.innerHTML = ''; // clear previous items
    
            for(var i=0;i<users.length;i++){
                showInUi(users[i]);
            }
        } catch(error){
            console.log(error);
        }
    } catch(err){
        console.log(err);
    }
}

function showInUi(data){
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(data.name +' - '+ data.phone));

    // add userId data attribute to list item...
    li.dataset.userId = data.id;

    const deleteBtn = document.createElement('button');
    deleteBtn.appendChild(document.createTextNode('delete')),
    li.appendChild(deleteBtn);

    const editBtn = document.createElement('button');
    editBtn.appendChild(document.createTextNode('edit'));
    li.appendChild(editBtn);

    ul.appendChild(li);

    deleteBtn.addEventListener('click', onDeleteClick);

    async function onDeleteClick(e){
        const userId = data.id;
        console.log(userId);

        try{
            const response = await axios.delete("http://localhost:3000/user/delete-user/" + userId);
            console.log(response);
            getUserDetails();
        } catch (err){
            console.log(err);
        }
    }

    editBtn.addEventListener('click', onEditClick);

    async function onEditClick(e){
        // pre-populate the fields...
        // 1) get the data...
        const userData = {
            name: data.name,
            email: data.email,
            phone: data.phone
        }

        // 2) populate fields...
        document.getElementById('name').value = userData.name;
        document.getElementById('email').value = userData.email;
        document.getElementById('phone').value = userData.phone;

        const userId = data.id;
        // console.log(userId);
        enterEditMode(userId);
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    getUserDetails();
});
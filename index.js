
//declaration
let firstName = document.getElementById('firstName');
let select = document.getElementById('select');
let birthday = document.getElementById('birthday');
let roomNumber = document.getElementById('roomnumber');
let create = document.getElementById('submit');
let deleteAllStorage = document.getElementById('deleteAllStorage');
let inputSearchName = document.getElementById('inputSearchName');
let mood = 'Create';
let ttt;
let extra = document.getElementById('extra');
//create button
let getData;
if (localStorage.Guest != null){
    getData = JSON.parse(localStorage.Guest);
}else{
    getData = [];
}
create.onclick = function(){
    let newData= {
        firstName:firstName.value.toUpperCase(),
        select:select.value,
        extra:extra.value,
        birthday:birthday.value,
        roomNumber:roomNumber.value,
    }
    if(firstName.value != '' & select.value !== '' & birthday.value !== '' & roomNumber.value !== '' & extra.value !== ''){
        if(mood === 'Create'){
            getData.push(newData);
            alert('Gebruiker is aangemaakt');
            }else{
            getData[ttt] = newData;
            alert('Gebruiker is bijgewerkt');
            mood = 'Create'
            create.innerHTML = 'Create';
            location.reload()
            }
            clearInput()
        }else{
            alert('Voer de gebruikersinformatie in !!')
        }
    //save localstorage and store the data in the big one
    localStorage.setItem('Guest',JSON.stringify(getData));
    showData()
};
function clearInput(){
    firstName.value = '';
    select.value = '';
    extra.value = '',
    birthday.value = '';
    roomNumber.value = '';
}
function showData(){
    let table = '';
    for(let i=0; i < getData.length; i++){
        table  += `
        <tr>
        <th>${i+1}</th>
        <th>${getData[i].firstName}</th>
        <th>${getData[i].select}</th>
        <th>${getData[i].extra}</th>
        <th>${getData[i].birthday}</th>
        <th>${getData[i].roomNumber}</th>
        <th><button onclick="updateData(${i})" id="update">update</button></th>
        <th><button onclick="deleteItem(${i})" id="delete">delete</button></th>
    </tr>`
    }
    document.getElementById('tbody').innerHTML = table;
    if(getData.length > 0){
        deleteAllStorage.innerHTML = `
        <button onclick="deleteAllStorage">Verwijder alles</button>`
    }else{
        deleteAllStorage.innerHTML = '';
    } 
};
showData()

//delete one item button
function deleteItem(i){
    getData.splice(i,1)
    localStorage.Guest = JSON.stringify(getData)
    showData()
    alert('De gebruiker is verwijderd');
}
//delete all items button
deleteAllStorage.onclick = function(){
    localStorage.clear()
    getData.splice(0)
    showData()
    alert('Alle gegevens zijn gewist')
    //or you can use only reload page
    //location.reload()
}
//update button function
function updateData(i){
    extra.style.display = '';
    firstName.value = getData[i].firstName;
    select.value = getData[i].select;
    extra.value = getData[i].extra;
    birthday.value = getData[i].birthday;
    roomNumber.value = getData[i].roomNumber;
    create.innerHTML = 'Bijwerken';
    mood = 'Update'
    ttt = i;
    span.onclick()
}

//search by name button
function getSearchName(value)
{
    let table = '';
    for(let i=0; i < getData.length; i++){
        if(getData[i].firstName.includes(value.toUpperCase())){
            table  += `
            <tr>
                <th>${i+1}</th>
                <th>${getData[i].firstName}</th>
                <th>${getData[i].select}</th>
                <th>${getData[i].extra}</th>
                <th>${getData[i].birthday}</th>
                <th>${getData[i].roomNumber}</th>
                <th><button onclick="updateData(${i})" id="update">update</button></th>
                <th><button onclick="deleteItem(${i})" id="delete">delete</button></th>
            </tr>`
        }
        document.getElementById('tbody').innerHTML = table;
    }
}
//search by kamernummer button
function getSearchVnummer(value)
{
    let table = '';
    for(let i=0; i < getData.length; i++){
        if(getData[i].roomNumber.includes(value)){
            table  += `
            <tr>
                <th>${i+1}</th>
                <th>${getData[i].firstName}</th>
                <th>${getData[i].select}</th>
                <th>${getData[i].extra}</th>
                <th>${getData[i].birthday}</th>
                <th>${getData[i].roomNumber}</th>
                <th><button onclick="updateData(${i})" id="update">update</button></th>
                <th><button onclick="deleteItem(${i})" id="delete">delete</button></th>
            </tr>`
        }
        document.getElementById('tbody').innerHTML = table;
    }
}

//up button (scroll)
let span = document.querySelector(".up");
window.onscroll = function(){
   // add scrolling action
   this.scrollY >= 240 ? span.classList.add("show") : span.classList.remove("show");
};

//add click on up scroll
span.onclick = function(){
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    })
};

// select menu items
function checkIfbike() {
    if (select.value == 'Fiets' || select.value == 'Gym-Kaart') {
      extra.style.display = '';
    } else {
        extra.style.display = 'none';
    }
  }
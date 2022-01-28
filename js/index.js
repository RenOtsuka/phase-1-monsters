function fetchMonster(){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)
    .then(resp => resp.json())
    .then(obj => {
        document.getElementById('monster-container').innerHTML = '';
        loadMonsters(obj)});
}

function loadMonsters(monsterObj){
    //const divMonster = document.getElementById('monster-container');

    for(let monster in monsterObj){
        let name = monsterObj[monster]['name'];
        let age = monsterObj[monster]['age'];
        let desc = monsterObj[monster]['description'];
        createMonsterDiv(name, age, desc);
        //console.log(monsterObj[monster]);
    }

}


function createMonsterDiv(monsterName, monsterAge, monsterDesc){
    let div = document.createElement('div');
    let name = document.createElement('h2');
    let age = document.createElement('h4');
    let description = document.createElement('p');

    name.innerHTML = monsterName;
    age.innerHTML = `Age: ${monsterAge}`;
    description.innerHTML = `Bio: ${monsterDesc}`;

    div.appendChild(name);
    div.appendChild(age);
    div.appendChild(description);
    
    document.getElementById('monster-container').appendChild(div);
}


function makeMonsterForm(){
    const form = document.createElement('form');
    form.id = 'monster-form';
    

    const nameInput = document.createElement('input');
    nameInput.id = 'name';
    nameInput.placeholder = 'name...';

    const ageInput = document.createElement('input');
    ageInput.id = 'age';
    ageInput.placeholder = 'age...';

    const descInput = document.createElement('input');
    descInput.id = 'description';
    descInput.placeholder = 'description...';

    const createBtn = document.createElement('button');
    createBtn.innerHTML = 'Create';

    form.appendChild(nameInput);
    form.appendChild(ageInput);
    form.appendChild(descInput);
    form.appendChild(createBtn);

    document.getElementById('create-monster').appendChild(form);

    document.getElementById('monster-form').addEventListener('submit', e => {
        e.preventDefault();
        let name = document.getElementById('name').value;
        let age = document.getElementById('age').value;
        let desc = document.getElementById('description').value;
        addNewMonster(name, age, desc);
        //document.querySelector('#monster-form').reset();
    })

}


function addNewMonster(name, age, description){
    fetch('http://localhost:3000/monsters', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            name: name,
            age: age,
            description: description,
        })
    })
    .then(resp => resp.json())
    .then(obj => console.log(obj))
}



function addPageNav(){

    let backPage = document.getElementById('back');
    let nextPage = document.getElementById('forward');

    backPage.addEventListener('click', function(){
        if(pageNum > 1){
            pageNum--;
            fetchMonster();
        }
        else{
            alert('Can\'t go back anymore');
        }
    });

    nextPage.addEventListener('click', function(){
        pageNum++;
        fetchMonster();
    })

}


let pageNum = 1;

document.addEventListener('DOMContentLoaded', function(){
    fetchMonster();
    makeMonsterForm();
    addPageNav();
});
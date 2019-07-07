var input = document.getElementById("input");
var list = document.querySelector(".list");
var list_item = document.querySelector(".list_item");
var list_item_text = document.querySelector(".list_item_text");
var li;
input.addEventListener("keyup", function(e) {

    if (e.which == 13) {
        let val = e.target.value;
        if (val.length != "" && val != "" && val != " " && !esta(val)) {
            let asda = localStorage.getItem("lists");
            let jaja = JSON.parse(asda === null ? "[]" : asda);
            console.log(jaja);
            var otra = {
                'tarea': val,
                'completed': false,
            };
            if (val.length > 0) {
                jaja.push(otra);
            }
            li = document.createElement("LI");
            list.appendChild(li);
            li.classList.add("list_item");
            li.innerHTML = "<span class='list_item_text' autofocus='autofocus'>" + val + "</span>";
            input.value = "";
            //Set item for localStorage
            var lists = list.innerHTML;
            localStorage.setItem('lists', JSON.stringify(jaja));
        } else {
            alert("No puedes agregar una tarea vacia o la tarea ya existe");
        }

        contar();
    }
}, false);


function removeComplete() {
    localStorage.setItem(
        "lists",
        JSON.stringify(
            JSON.parse(localStorage.getItem("lists")).filter(item => {
                return item.completed !== true;
            })
        )
    );
    contar();
}


//tener listita localStorage
if ('lists' in localStorage) {

    let asda = localStorage.getItem('lists')
    let jaja = "";
    jaja = JSON.parse(asda === null ? "[]" : asda);
    for (var i = 0; i < jaja.length; i++) {
        var li = document.createElement("li");
        li = document.createElement("LI");
        list.appendChild(li);
        li.classList.add("list_item");
        li.innerHTML = "<span class='list_item_text' name='" + jaja[i].tarea + "' autofocus='autofocus'>" + jaja[i].tarea + "</span>";
        var lists = list.innerHTML;
        if (jaja[i].completed) {
            li.classList.toggle('checked');
        }

    }
    contar();
} else {
    let asda = localStorage.getItem('lists')
    let jaja = "";
    jaja = JSON.parse(asda === null ? "[]" : asda);

    fetch('http://jsonplaceholder.typicode.com/todos?_start=0&_limit=10')
        .then(response => response.json()).then(function(json) {
            for (var z = 0; z < json.length; z++) {
                if (json[z].completed) {
                    li.classList.toggle('checked');
                }
                li = document.createElement("LI");
                list.appendChild(li);
                li.classList.add("list_item");
                li.innerHTML = "<span class='list_item_text' name='" + json[z].title + "' autofocus='autofocus'>" + json[z].title + "</span>";
                li.contentEditable = false;
                var otra = {
                    'tarea': json[z].title,
                    'completed': json[z].completed,
                };
                if (json[z].title.length > 0) {
                    jaja.push(otra);
                }
                localStorage.setItem('lists', JSON.stringify(jaja));
            }
            contar();
        })
}

//pa contar
function contar() {

    let asda = localStorage.getItem('lists')
    let jaja = "";
    jaja = JSON.parse(asda === null ? "[]" : asda);
    let numero = 0;
    let incompleta = 0;
    for (var i = 0; i < jaja.length; i++) {
        if (jaja[i].completed) {
            numero++;
        }
        if (!jaja[i].completed) {
            incompleta++;
        }

    }
    document.getElementById('comple').innerHTML = numero;
    document.getElementById('incom').innerHTML = incompleta;
}

//doblle click pa orra
document.querySelector('body').addEventListener('dblclick', function(event) {
    //Pa borrar dobleclick list_item
    if (event.target.classList[0] === 'list_item') {
        texto2 = event.target.innerText;
        console.log(texto2);
        let asda = localStorage.getItem("lists");
        let jaja = JSON.parse(asda === null ? "[]" : asda);
        console.log(jaja);
        for (var i = 0; i < jaja.length; i++) {
            if (jaja[i].tarea == texto2) {

                removeItem(texto2);
                event.target.remove();
                contar();
            }
        }
        /*
    lists = [];
  updateList(listItems, toDoList);
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
    var lists = list.innerHTML;
    localStorage.setItem('lists', lists);*/
    }
});
document.querySelector('button').addEventListener('click', function(event) {
    if (event.target.classList[0] === 'jaja') {

        removeComplete();
        list.innerHTML = '';
        let asda = localStorage.getItem('lists')
        let jaja = "";
        jaja = JSON.parse(asda === null ? "[]" : asda);
        for (var i = 0; i < jaja.length; i++) {
            var li = document.createElement("li");
            li = document.createElement("LI");
            list.appendChild(li);
            li.classList.add("list_item");
            li.innerHTML = "<span class='list_item_text' name='" + jaja[i].tarea + "' autofocus='autofocus'>" + jaja[i].tarea + "</span>";
            var lists = list.innerHTML;
            if (jaja[i].completed) {
                li.classList.toggle('checked');
            }

        }
        contar();
    }
});

function removeItem(item_title) {
    localStorage.setItem(
        "lists",
        JSON.stringify(
            JSON.parse(localStorage.getItem("lists")).filter(item => {
                return item.tarea !== item_title;
            })
        )
    );
}

function esta(texto) {
    let asda = localStorage.getItem('lists')
    let jaja = "";
    jaja = JSON.parse(asda === null ? "[]" : asda);
    let valor = false;
    for (var i = 0; i < jaja.length; i++) {
        if (jaja[i].tarea == texto) {
            valor = true;
        }

    }
    return valor;
}



document.querySelector('div').addEventListener('contextmenu', function(event) {
    event.preventDefault();
    //doble click en  pa editar list_item_text
    if (event.target.classList[0] === 'list_item_text') {
        texto2 = event.target.innerText;
        event.target.contentEditable = true;
        //Enter pa guardar
        event.target.addEventListener("keydown", function(e) {
                if (e.keyCode == 13) {
                    texto = event.target.innerText;
                         if (texto.length != "" && texto != "" && texto != " " && !esta(texto)) {
                        let asda = localStorage.getItem("lists");
                        let jaja = JSON.parse(asda === null ? "[]" : asda);
                        console.log(jaja);
                        for (var i = 0; i < jaja.length; i++) {
                            if (jaja[i].tarea == texto2) {
                                jaja[i].tarea = texto;
                            }
                        }
                        // var lists = list.innerHTML;
                        event.target.contentEditable = false;
                        // localStorage.setItem('lists', lists);
                        localStorage.setItem('lists', JSON.stringify(jaja));
                    }else{
                        event.target.innerText = texto2
                        event.target.contentEditable = false;
                        alert("Ya existe una tarea con ese nombre");

                    }
                }
                }, false);
        }
    });

var listita = document.querySelector('ul');
listita.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
        texto = event.target.innerText;
        let asda = localStorage.getItem("lists");
        let jaja = JSON.parse(asda === null ? "[]" : asda);
        console.log(jaja);
        for (var i = 0; i < jaja.length; i++) {
            if (jaja[i].tarea == texto) {
                if (jaja[i].completed) {
                    jaja[i].completed = false;
                } else {
                    jaja[i].completed = true;
                }
            }
        }
        localStorage.setItem('lists', JSON.stringify(jaja));
        contar();
    }
}, false);
let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];

addButton.addEventListener("click", addTask);
taskInput.addEventListener("focus",function(){taskInput.value=""});

function addTask(){
    let task = {
        id:randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete:false
    };
    taskList.push(task);
    console.log(taskList);
    render();
}

function render(){
    let resultHTML = '';
    for(let i=0;i<taskList.length;i++){
        resultHTML += `<div class="task">
        <div>${taskList[i].taskContent}</div>
        <div><button onclick="toggleComplete('${taskList[i].id}')">Check</button>
        <button>Delete</button>
        </div>
    </div>`;
}
    
    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
    console.log("id:",id)
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substring(2, 9);
}
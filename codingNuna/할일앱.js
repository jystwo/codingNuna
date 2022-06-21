let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taps = document.querySelectorAll(".task-taps div");
let taskList = [];
let filterList =[];
let mode = "all";

addButton.addEventListener("click", addTask);
taskInput.addEventListener("focus",function(){taskInput.value=""});


for(let i =1;i<taps.length;i++){
    taps[i].addEventListener("click",function(event){
        filter(event);
    });
}


function addTask(){
    let task = {
        id:randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete:false
    };
    taskList.push(task);
    
    render();
}

function render(){
    let list = [];
    if(mode == "all"){
        list = taskList
    } else if(mode == "ongoing" || mode == "done"){
        list = filterList
    }
    let resultHTML = '';
    for(let i=0;i<list.length;i++){
if(list[i].isComplete == true){
    resultHTML +=`<div class="task task-done">
    <span>${list[i].taskContent}</span>
    <div class="button-box"><button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-arrow-rotate-left"></i></button>
    <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
    </div>
</div>`
} else{

        resultHTML += `<div class="task">
        <span>${list[i].taskContent}</span>
        <div><button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
        <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
        </div>
    </div>`;
    }
}
    
    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
    for(let i = 0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete= !taskList[i].isComplete;
            break;
        }
    }
    render();
    
}

function deleteTask(id){
    for(let i = 0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i,1);
            break;
        }
    }
    render();
    
}

function filter(event){
    mode = event.target.id;
    filterList =[];

    
    
    if(mode == "all"){
        render()
    } else if(mode === "ongoing"){
        for(let i =0;i<taskList.length;i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i]);
            } 
        }
        
        render();
    } else if(mode === "done"){
        for(let i =0;i<taskList.length;i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i]);
            }
        }
    render();
    }
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substring(2, 9);
}
import { useState, useEffect } from "react";

function TodoList(){

    // const [tasks, setTasks]=useState([]);
    
    const [tasks,setTasks]=useState(()=>{
        const saved=localStorage.getItem("todolist");
        return saved ? JSON.parse(saved) : [];
    })
    
    const [newTasks,setNewTasks]=useState("");

    useEffect(()=>{
        localStorage.setItem("todolist",JSON.stringify(tasks));
    },[tasks]);

    function ListChange(event){
        setNewTasks(event.target.value);
    }

    function addTask(){
        if(newTasks.trim()!==""){
            setTasks(t=>[...t, newTasks]);
            setNewTasks("");
        }
    }

    function deleteTask(index){
        const updatedTasks=tasks.filter((element,i)=> i!==index);
        setTasks(updatedTasks);
    }

    function moveTaskDown(index){
        if(index<tasks.length-1){
            const updatedTasks=[...tasks];
            [updatedTasks[index],updatedTasks[index+1]]=[updatedTasks[index+1],updatedTasks[index]];
            setTasks(updatedTasks);
        }

    }

    function moveTaskUp(index){
        if(index>0){
            const updatedTasks=[...tasks];
            [updatedTasks[index],updatedTasks[index-1]]=[updatedTasks[index-1],updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    return(
        <div className="to-do-list">
            <h1>MonoDo (To-Do List)</h1>
            <div>
                <input type="text" placeholder="Enter a task..." value={newTasks} onChange={ListChange}/>
                <button className="add-button" onClick={addTask}>Add</button>
            </div>

            <ol>
                {tasks.map((task,index)=>
                    <li key={index}>
                        <span className="text">{task}</span>
                        <button className="delete-button"  onClick={()=>deleteTask(index)}>Delete</button>
                        <button className="button-box"  onClick={()=>moveTaskUp(index)}>⬆️</button>
                        <button className="button-box"  onClick={()=>moveTaskDown(index)}>⬇️</button>
                    </li>
                )}
            </ol>
        </div>
    );
}

export default TodoList
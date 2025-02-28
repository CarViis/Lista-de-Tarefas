function funcaop() {
    const tarefa = document.querySelector('#inputTarefa').value;
    const data = document.querySelector('#inputData').value;
    const prioridade = document.querySelector('#inputPrioridade').value;

    if (tarefa && data && prioridade) {
        const today = new Date().toISOString().split('T')[0];
        const li = document.createElement('li');
        li.onclick = function() { toggleTask(this); };

        const taskSpan = document.createElement('span');
        taskSpan.className = 'task';
        taskSpan.textContent = tarefa;

        const separator1 = document.createTextNode(' | ');

        const dateSpan = document.createElement('span');
        dateSpan.className = 'date';
        dateSpan.textContent = data;

        const separator2 = document.createTextNode(' | ');

        const prioritySpan = document.createElement('span');
        prioritySpan.className = 'priority';
        prioritySpan.textContent = prioridade;

        li.appendChild(taskSpan);
        li.appendChild(separator1);
        li.appendChild(dateSpan);
        li.appendChild(separator2);
        li.appendChild(prioritySpan);

        if (data < today) {
            li.classList.add('expired');  
        }
        
        const listaTarefas = document.querySelector('#listaTarefas');
        const items = listaTarefas.querySelectorAll('li');
        let inserted = false;

        for (let i = 0; i < items.length; i++) {
            const itemPriority = items[i].querySelector('.priority').textContent;
            if (comparePriority(prioridade, itemPriority) < 0) {
                listaTarefas.insertBefore(li, items[i]);
                inserted = true;
                break;
            }
        }

        if (!inserted) {
            listaTarefas.appendChild(li);
        }

        // Limpa os campos
        document.querySelector('#inputTarefa').value = '';
        document.querySelector('#inputData').value = '';
        document.querySelector('#inputPrioridade').value = '';
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function comparePriority(a, b) {
    const priorities = { 'Alta': 1, 'Média': 2, 'Baixa': 3 };
    return priorities[a] - priorities[b];
}

function toggleTask(task) {
    task.classList.toggle("done");
    task.setAttribute("data-de-conclusao", new Date().toISOString().split('T')[0]);
    if (task.classList.contains("done")) {
        task.style.display = 'none';
    }else{
        task.setAttribute("data-de-conclusao", "");
    }
}

function showConclusionDate(event) {
    if (event.target.classList.contains("done")) {
        const conclusionDate = event.target.getAttribute("data-de-conclusao");
        const tooltip = document.createElement("span");
        const data = event.target.querySelector('.date').textContent;
        tooltip.className = "tooltip";
        if (conclusionDate> data) {
            tooltip.textContent = `Data de Conclusão: ${conclusionDate} (atrasada)`;
        } else {
            tooltip.textContent = `Data de Conclusão: ${conclusionDate} (no prazo)`;
        }
        event.target.appendChild(tooltip);
    }
}

function hideConclusionDate(event) {
    if (event.target.classList.contains("done")) {
        const tooltip = event.target.querySelector(".tooltip");
        if (tooltip) {
            event.target.removeChild(tooltip);
        }
    }
}

document.addEventListener("mouseover", showConclusionDate);
document.addEventListener("mouseout", hideConclusionDate);

function changeFontSize(delta){
    let todosElem = document.querySelectorAll("*");
    todosElem.forEach(element => {
        let tamanhoEl = window.getComputedStyle(element).fontSize;
        let tamanhoNov = parseFloat(tamanhoEl) + delta;
        element.style.fontSize = tamanhoNov + "px";
    });
}

let toggled = true;
function toggleCompletedTasks() {
    const completedTasks = document.querySelectorAll('#listaTarefas li.done');
    const button = document.querySelector('#buttonCompletedTasks');
    if(toggled){
        button.textContent = 'Ocultar Tarefas Concluídas';
        completedTasks.forEach(task => {
            task.style.display = 'list-item';
        });
        toggled = false;
    }else{
        button.textContent = 'Ver Tarefas Concluídas';
        completedTasks.forEach(task => {
            task.style.display = 'none';
        });
        toggled = true;
    }
}

function checkExpiredTasks() {
    const today = new Date().toISOString().split('T')[0];
    const tasks = document.querySelectorAll('#listaTarefas li');
    tasks.forEach(task => {
        const date = task.querySelector('.date').textContent;
        if (date < today) {
            task.classList.add('expired');
        } else {
            task.classList.remove('expired');
        }
    });
}

// Call checkExpiredTasks on page load
document.addEventListener('DOMContentLoaded', checkExpiredTasks);
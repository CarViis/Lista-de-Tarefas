function funcaop() {
    const tarefa = document.querySelector('#inputTarefa').value;
    const data = document.querySelector('#inputData').value;
    const prioridade = document.querySelector('#inputPrioridade').value;

    if (tarefa && data && prioridade) {
        const today = new Date().toISOString().split('T')[0];
        if (data < today) {
            alert('A data de vencimento não pode ser no passado.');
            return;
        }

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

function toggleTask(task){
    task.classList.toggle("done");
    if (task.classList.contains("done")) {
        task.style.display = 'none';
    }
}

function changeFontSize(delta){
    let todosElem = document.querySelectorAll("*");
    todosElem.forEach(element => {
        let tamanhoEl = window.getComputedStyle(element).fontSize;
        let tamanhoNov = parseFloat(tamanhoEl) + delta;
        element.style.fontSize = tamanhoNov + "px";
    });
}

function toggleCompletedTasks() {
    const completedTasks = document.querySelectorAll('#listaTarefas li.done');
    completedTasks.forEach(task => {
        task.style.display = task.style.display === 'none' ? 'list-item' : 'none';
    });
}
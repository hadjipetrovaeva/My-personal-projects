const form = document.getElementById("form");
const list = document.getElementById("list");

const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

let transactions = [];

const chart = new Chart(document.getElementById("myChart"), {
    type: "pie",
    data: {
        labels: ["Income", "Expense"],
        datasets: [{
            data: [0, 0]
        }]
    }
});

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const text = document.getElementById("text").value;
    const amount = Number(document.getElementById("amount").value);
    const type = document.getElementById("type").value;

    if(text === "" || amount === 0){
        return;
    }

    transactions.push({
        text,
        amount,
        type
    });

    updateScreen();

    form.reset();
});

function updateScreen(){

    list.innerHTML = "";

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction,index)=>{

        if(transaction.type === "income"){
            totalIncome += transaction.amount;
        }else{
            totalExpense += transaction.amount;
        }

        const li = document.createElement("li");

        li.innerHTML = `
            ${transaction.text} - $${transaction.amount}
            <button class="delete" onclick="removeTransaction(${index})">X</button>
        `;

        list.appendChild(li);
    });

    income.textContent = "$" + totalIncome;
    expense.textContent = "$" + totalExpense;
    balance.textContent = "$" + (totalIncome - totalExpense);

    chart.data.datasets[0].data = [totalIncome, totalExpense];
    chart.update();
}

function removeTransaction(index){
    transactions.splice(index,1);
    updateScreen();
}
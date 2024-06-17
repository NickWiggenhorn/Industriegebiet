// script.js
document.addEventListener('DOMContentLoaded', () => {
    let machines = [
        { id: 1, name: "Bagger", status: "frei", renter: "" },
        { id: 2, name: "Radlader", status: "vermietet", renter: "Firma Müller" },
        { id: 3, name: "Walze", status: "frei", renter: "" },
        { id: 4, name: "Kran", status: "vermietet", renter: "Bau AG" }
    ];

    const machineList = document.getElementById('machine-items');
    const editForm = document.getElementById('edit-machine-form');
    const machineIdField = document.getElementById('machine-id');
    const machineNameField = document.getElementById('machine-name');
    const machineStatusField = document.getElementById('machine-status');
    const machineRenterField = document.getElementById('machine-renter');
    const cancelEditButton = document.getElementById('cancel-edit');

    function renderMachines() {
        machineList.innerHTML = '';
        machines.forEach(machine => {
            const li = document.createElement('li');
            li.className = 'machine-item';
            li.dataset.id = machine.id;

            const statusClass = machine.status === "frei" ? "machine-available" : "machine-rented";

            li.innerHTML = `
                <div>
                    <span class="machine-name">${machine.name}</span> - 
                    <span class="machine-status ${statusClass}">${machine.status}</span>
                </div>
                ${machine.status === "vermietet" ? `<div>Vermietet an: ${machine.renter}</div>` : ""}
                <div class="edit-buttons">
                    <button class="edit-machine">Bearbeiten</button>
                    <button class="delete-machine">Löschen</button>
                </div>
            `;

            machineList.appendChild(li);
        });
    }

    function openEditForm(machine = {}) {
        machineIdField.value = machine.id || '';
        machineNameField.value = machine.name || '';
        machineStatusField.value = machine.status || 'frei';
        machineRenterField.value = machine.renter || '';
    }

    function handleEdit(event) {
        const machineId = parseInt(machineIdField.value);
        const machineName = machineNameField.value;
        const machineStatus = machineStatusField.value;
        const machineRenter = machineRenterField.value;

        if (machineId) {
            const machine = machines.find(m => m.id === machineId);
            machine.name = machineName;
            machine.status = machineStatus;
            machine.renter = machineStatus === 'vermietet' ? machineRenter : '';
        } else {
            const newMachine = {
                id: Date.now(),
                name: machineName,
                status: machineStatus,
                renter: machineStatus === 'vermietet' ? machineRenter : ''
            };
            machines.push(newMachine);
        }

        renderMachines();
        editForm.reset();
    }

    function handleDelete(event) {
        const machineId = parseInt(event.target.closest('.machine-item').dataset.id);
        machines = machines.filter(machine => machine.id !== machineId);
        renderMachines();
    }

    machineList.addEventListener('click', event => {
        if (event.target.classList.contains('edit-machine')) {
            const machineId = parseInt(event.target.closest('.machine-item').dataset.id);
            const machine = machines.find(m => m.id === machineId);
            openEditForm(machine);
        } else if (event.target.classList.contains('delete-machine')) {
            handleDelete(event);
        }
    });

    editForm.addEventListener('submit', event => {
        event.preventDefault();
        handleEdit(event);
    });

    cancelEditButton.addEventListener('click', () => {
        editForm.reset();
    });

    renderMachines();
});
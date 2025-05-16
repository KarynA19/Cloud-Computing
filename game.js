document.addEventListener("DOMContentLoaded", () => {
    const actions = [
        { id: "primary", title: "Adjust Temperature", placeholder: "Enter Temperature (°C)", unit: "°C" },
        { id: "secondary", title: "Modify Humidity", placeholder: "Enter Humidity (%)", unit: "%" },
        { id: "tertiary", title: "Set Pressure", placeholder: "Enter Pressure (Pa)", unit: "Pa" },
        { id: "warning", title: "Emergency Protocol", placeholder: "Enter Emergency Code", unit: "" }
    ];

    actions.forEach(action => {
        const button = document.querySelector(`.action-btn.${action.id}`);
        if (button) {
            button.addEventListener("click", () => {
                openModal(action.title, action.placeholder, action.unit);
            });
        }
    });

    // Handle Suggested Actions Submit Button
    const suggestedActionsButton = document.querySelector(".submitbtn");
    if (suggestedActionsButton) {
        suggestedActionsButton.addEventListener("click", () => {
            const checkedItems = Array.from(document.querySelectorAll(".action-buttons2 input:checked"))
                .map(item => item.parentNode.textContent.trim());
            if (checkedItems.length > 0) {
                openModal("Selected Actions", "", "", checkedItems.join("<br>"));
            } else {
                alert("Please select at least one action.");
            }
        });
    }

    function openModal(title, placeholder, unit, content = "") {
        const modal = document.createElement("div");
        modal.classList.add("modal-overlay");
        modal.innerHTML = `
            <div class="modal">
                <h2>${title}</h2>
                ${content ? `<p>${content}</p>` : ''}
                ${!content ? `<input type="text" placeholder="${placeholder}" id="modal-input" />` : ''}
                <button id="submit-button">Submit</button>
                <button onclick="closeModal()">Cancel</button>
                <div class="success-message" style="display: none; margin-top: 20px; color: green; font-size: 20px;">
                    ✔️ Success!
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Add submit button logic
        const submitButton = modal.querySelector("#submit-button");
        const successMessage = modal.querySelector(".success-message");

        submitButton.addEventListener("click", () => {
            if (successMessage) {
                successMessage.style.display = "block";
                submitButton.style.display = "none";
                setTimeout(() => {
                    closeModal();
                    location.reload();
                }, 2000);
            }
        });
    }

    window.closeModal = () => {
        const modal = document.querySelector(".modal-overlay");
        if (modal) modal.remove();
    }

    function processSelectedActions(actions) {
        console.log("Selected actions:", actions);
        actions.forEach(action => console.log(`Executing: ${action}`));
    }
});
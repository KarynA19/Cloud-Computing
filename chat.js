document.addEventListener("DOMContentLoaded", () => {
    // Add event listener for the 'Chat Manager' button
    const chatManagerButton = document.querySelector(".message-manager");
    if (chatManagerButton) {
        chatManagerButton.addEventListener("click", (e) => {
            e.preventDefault();
            openChatModal();
        });
    }

    function openChatModal() {
        const modal = document.createElement("div");
        modal.classList.add("modal-overlay");
        modal.innerHTML = `
            <div class="modal" style="width: 400px;">
                <h2>Chat with Manager</h2>
                <input type="text" id="chat-subject" placeholder="Subject" style="width: 100%; padding: 10px; margin-bottom: 15px; border-radius: 8px; border: 1px solid #ddd;" />
                <textarea id="chat-message" placeholder="Type your message here..." style="width: 100%; height: 150px; margin-bottom: 20px; border-radius: 8px; padding: 10px; border: 1px solid #ddd;"></textarea>
                <button id="send-chat-button" style="background-color: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">Send</button>
                <button onclick="closeModal()" style="margin-left: 10px; background-color: #ccc; color: black; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">Cancel</button>
                <div class="success-message" style="display: none; margin-top: 20px; color: green; font-size: 20px;">
                    ✔️ Message Sent!
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Handle message send
        const sendButton = modal.querySelector("#send-chat-button");
        const successMessage = modal.querySelector(".success-message");

        sendButton.addEventListener("click", () => {
            const subject = document.getElementById("chat-subject").value.trim();
            const message = document.getElementById("chat-message").value.trim();
            if (subject && message) {
                // Simulate message sending
                successMessage.style.display = "block";
                sendButton.style.display = "none";
                setTimeout(() => {
                    closeModal();
                    location.reload();
                }, 2000);
            } else {
                alert("Please enter both subject and message before sending.");
            }
        });
    }

    window.closeModal = () => {
        const modal = document.querySelector(".modal-overlay");
        if (modal) modal.remove();
    }
});

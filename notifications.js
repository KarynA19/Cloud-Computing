function initManagerNotifications() {
  const form = document.getElementById("notification-form");
  const textArea = document.getElementById("notification-text");
  const history = document.getElementById("notification-history");

  if (!form || !textArea || !history) return;

  let notifications = getStoredNotifications();
  notifications.forEach((note, index) => addNoteToDOM(note, history, index));

  form.addEventListener("submit", e => {
    e.preventDefault();
    const message = textArea.value.trim();
    if (!message) return;

    const timestamp = new Date().toISOString();
    const note = { message, timestamp };

    notifications.push(note);
    saveNotifications(notifications);
    addNoteToDOM(note, history, notifications.length - 1);
    textArea.value = "";
  });
}

function initDashboardNotifications() {
  const box = document.getElementById("notifications-list");
  if (!box) return;

  const notifications = getStoredNotifications();
  notifications.forEach((note, index) => addNoteToDOM(note, box, index));
}

function getStoredNotifications() {
  return JSON.parse(localStorage.getItem("notifications") || "[]");
}

function saveNotifications(notifications) {
  localStorage.setItem("notifications", JSON.stringify(notifications));
}

function addNoteToDOM(note, container, index = null) {
  const li = document.createElement("li");
  li.classList.add("notification-item");

  const date = new Date(note.timestamp);
  const formatted = date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const timeAgo = getTimeAgo(date);

  const content = document.createElement("div");
  content.className = "notification-content";

  const title = document.createElement("strong");
  title.textContent = note.message;

  const meta = document.createElement("div");
  meta.className = "notification-time";
  meta.textContent = `${formatted} — ${timeAgo}`;

  content.appendChild(title);
  content.appendChild(meta);

  li.appendChild(content);

  // Only add delete button for manager
  if (window.location.pathname.includes("manager.html")) {
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-note-btn delete-notification";
    deleteBtn.textContent = "🗑️";
    deleteBtn.onclick = () => {
      const notifications = getStoredNotifications();
      notifications.splice(index, 1);
      saveNotifications(notifications);
      li.remove();
    };
    li.appendChild(deleteBtn);
  }

  container.prepend(li);
}

function getTimeAgo(date) {
  const now = new Date();
  const diffMs = now - date;
  const mins = Math.floor(diffMs / 60000);
  const hrs = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);

  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("manager.html")) {
    initManagerNotifications();
  } else {
    initDashboardNotifications();
  }
});

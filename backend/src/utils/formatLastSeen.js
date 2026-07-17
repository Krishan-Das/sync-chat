export function formatLastSeen(lastSeen) {
    const date = new Date(lastSeen);
    const now = new Date();

    const diff = now - date;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (seconds < 60) return "Last seen just now";

    if (minutes < 60)
        return `Last seen ${minutes} minute${minutes > 1 ? "s" : ""} ago`;

    if (hours < 24)
        return `Last seen ${hours} hour${hours > 1 ? "s" : ""} ago`;

    if (days === 1)
        return `Last seen yesterday at ${date.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
        })}`;

    return `Last seen on ${date.toLocaleDateString([], {
        month: "short",
        day: "numeric",
        year: "numeric",
    })}`;
}
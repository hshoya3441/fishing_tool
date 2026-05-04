// ネットワーク状態を判定して表示
function updateNetworkStatus() {
    const statusEl = document.getElementById("network-status");

    if (navigator.onLine) {
        statusEl.textContent = "Network Status: Online";
    } else {
        statusEl.textContent = "Network Status: Disconnected";
    }
}

updateNetworkStatus();
window.addEventListener("online", updateNetworkStatus);
window.addEventListener("offline", updateNetworkStatus);

// Device Information ボタン
document.getElementById("device-info-btn").addEventListener("click", () => {
    window.location.href = "Device_Info.html";
});

// モード選択ボタン
document.getElementById("before-btn").addEventListener("click", () => {
    window.location.href = "Before_Fishing.html";
});

document.getElementById("during-btn").addEventListener("click", () => {
    window.location.href = "During_Fishing.html";
});

// 日付と時刻のリアルタイム表示 + バッテリー残量
async function updateDateTime() {
    const dtEl = document.getElementById("datetime");
    const now = new Date();

    const MM = String(now.getMonth() + 1).padStart(2, "0");
    const DD = String(now.getDate()).padStart(2, "0");
    const YYYY = now.getFullYear();

    const HH = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const SS = String(now.getSeconds()).padStart(2, "0");

    // UTCオフセット取得（分 → 時間）
    const offsetMin = now.getTimezoneOffset();
    const offsetHour = Math.abs(offsetMin / 60);
    const sign = offsetMin <= 0 ? "+" : "-";
    const offsetStr = `UTC${sign}${String(offsetHour).padStart(2, "0")}`;

    // バッテリー残量取得（対応ブラウザのみ）
    let batteryText = "";
    try {
        const battery = await navigator.getBattery();
        const percent = Math.round(battery.level * 100);
        batteryText = `   Battery: ${percent}%`;
    } catch {
        batteryText = "   Battery: N/A";
    }

    dtEl.textContent = `${MM}/${DD}/${YYYY}  ${HH}:${mm}:${SS} ${offsetStr}${batteryText}`;
}

setInterval(updateDateTime, 1000);
updateDateTime();

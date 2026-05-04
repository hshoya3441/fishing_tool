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

// モード選択ボタン（During Fishing）
document.getElementById("during-btn").addEventListener("click", async () => {

    let batteryPercent = 100;

    try {
        const battery = await navigator.getBattery();
        batteryPercent = Math.round(battery.level * 100);
    } catch {
        // バッテリー取得できない場合はそのまま遷移
        window.location.href = "During_Fishing.html";
        return;
    }

    // 50% 以下なら警告ポップアップ
    if (batteryPercent <= 50) {
        showBatteryWarning();
    } else {
        window.location.href = "During_Fishing.html";
    }
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

    // バッテリー残量取得
    let batteryPercent = "N/A";
    let batteryLevelWidth = "0%";
    let batteryColor = "limegreen";

    try {
        const battery = await navigator.getBattery();
        batteryPercent = Math.round(battery.level * 100);
        batteryLevelWidth = batteryPercent + "%";

        // 色分岐（iPhone風）
        if (batteryPercent <= 10) {
            batteryColor = "red";
        } else if (batteryPercent <= 30) {
            batteryColor = "yellow";
        } else {
            batteryColor = "limegreen";
        }
    } catch {}

    dtEl.innerHTML = `
        ${MM}/${DD}/${YYYY} ${HH}:${mm}:${SS} ${offsetStr}
        <div class="battery-icon">
            <div class="battery-level" style="width:${batteryLevelWidth}; background:${batteryColor};"></div>
        </div>
        <span>${batteryPercent}%</span>
    `;
}

function showBatteryWarning() {
    const popup = document.createElement("div");
    popup.className = "popup-overlay";
    popup.innerHTML = `
        <div class="popup-box">
            <p>Battery is low, it may run out while you are fishing.<br>Do you want to continue?</p>
            <div class="popup-buttons">
                <button id="popup-yes">Yes</button>
                <button id="popup-no">No</button>
            </div>
        </div>
    `;

    document.body.appendChild(popup);

    document.getElementById("popup-yes").onclick = () => {
        popup.remove();
        window.location.href = "During_Fishing.html";
    };

    document.getElementById("popup-no").onclick = () => {
        popup.remove();
    };
}


setInterval(updateDateTime, 1000);
updateDateTime();

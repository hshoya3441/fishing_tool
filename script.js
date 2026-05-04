body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background-image: url("background.jpg"); /* 必要に応じて差し替え */
    background-size: cover;
    background-position: center;
    color: white;
}

.header {
    display: flex;
    justify-content: space-between;
    padding: 15px;
    background: rgba(0, 0, 0, 0.4);
}

#network-status {
    font-size: 18px;
    font-weight: bold;
}

#device-info-btn {
    padding: 8px 15px;
    font-size: 14px;
    cursor: pointer;
}

.container {
    text-align: center;
    margin-top: 150px;
}

h1 {
    font-size: 40px;
    margin-bottom: 40px;
}

.mode-btn {
    display: block;
    width: 250px;
    margin: 20px auto;
    padding: 20px;
    font-size: 22px;
    cursor: pointer;
    border: none;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    transition: 0.3s;
}

.mode-btn:hover {
    background: rgba(255, 255, 255, 0.3);
}

/* 左下の日時表示 */
#datetime {
    position: fixed;
    bottom: 10px;
    left: 10px;
    font-size: 16px;
    background: rgba(0, 0, 0, 0.4);
    padding: 6px 12px;
    border-radius: 6px;
}

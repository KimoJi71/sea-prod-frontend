const express = require('express');
const app = express();

// 訪問靜態網頁
app.use(express.static('dist'));

// 訪問單頁
app.get('*', function (req, res) {
    res.sendFile(__dirname,'./dist/index.html')
});

// 監聽
app.listen(3001, () => {
    console.log('success listen...3001');
});
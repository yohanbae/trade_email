const express = require('express')   // 설치해라
const cors = require('cors')  // 설치해라

require('dotenv').config()  // 설치해라

const app = express()    // express server 시작하기
const port = process.env.PORT || 5000;

app.use(cors());  // cors middleware
app.use(express.json());   //  서버에서 json을 쓸수있도록 설정해줌

const emailRouter = require('./routes/email');
app.use('/email', emailRouter);

app.listen(port, () => {
    console.log(`server running on port: ${port}`);
})
# Restaurant
Restaurant List <br> 

<image src="https://user-images.githubusercontent.com/88585009/148733920-fa268009-87f3-48b6-8d5f-260ad7aea280.png" style="width:10; height:10;">

環境建置與需求 (prerequisites)
<ul>
<li>
    "express": "^4.17.2"
    </li>
    <li>
    "express-handlebars": "^6.0.2"
     </li>
    <li>
    "method-override": "^3.0.0"
     </li>
    <li>
    "mongoose": "^6.1.5"
     </li>
    <li>
    "nodemon": "^2.0.15"
</li>
 <li>
資料庫使用:mongodb
    </li>
</ul>

安裝與執行步驟 (installation and execution)
<ul>
<li>
$git clone https://github.com/changpusheng/Restaurant.git
</li>
<li>
$git cd  Restaurant/
</li>
<li>
$npm init -y
</li>
<li>
$npm install express express-handlebars nodemon mongoose
</li>
<li>
$npm run seed
</li>
<li>
$npm run dev
</li>
<li>
看到 
This server is running on http://localhost:3000.
mongoose connected!
代表伺服器和資料庫連線成功!!
</li>
</ul>
功能描述 (features)
<ul>
<li>
搜尋功能
</li>
<li>
新增餐館
</li>
<li>
瀏覽餐館
</li>
<li>
編輯餐館
</li>
<li>
移除餐館
</li>
<li>
增加排序的功能
</li>
</ul>

修改部分:
<ul>
<li>
編輯頁面
</li>
<li>
新增餐廳頁面
</li>
<li>
app.js和mongoose 部分code重構
</li>
</ul>


### `note`

1. 拿json資料路徑要防呆
2. initdata(當輸入沒有對應日期時)拿最近日期的資料
3. 如果月數前後天數一樣找資料多的
4. 判斷資料引入方式 是否正確
5. 指定 如果沒有 這個月份 請找相近
6. 容器必須是同一個
7. props 可吃array/url/其他不行 (regex)
    - 有指定日期 > 沒有資料 > 找相近的月份當資料
    - 無指定日期 > 沒有資料 > 拿最近的月份當資料
8. data2  有一個街口來調設定
9. inputdata可以加額外資料
10. 切換列表模式 適用classname做切換


-------------------------------------------

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

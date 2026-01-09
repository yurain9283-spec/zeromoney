# 如何發布到 GitHub Pages

為了讓您的員工可以隨時隨地使用這套系統，我們需要將程式碼上傳到 GitHub 並開啟 GitHub Pages 功能。

### 第一步：建立 GitHub 儲存庫 (Repository)

1. 登入 [GitHub](https://github.com/) (若無帳號請先註冊)。
2. 點擊右上角的 **+** 號，選擇 **New repository**。
3. 在 **Repository name** 輸入 `money` (或是您喜歡的名字)。
4. 選擇 **Public** (公開)。
5. **不要** 勾選 "Add a README" 等初始化選項 (因為我們已經在本地準備好了)。
6. 點擊 **Create repository**。

### 第二步：上傳程式碼

建立完成後，GitHub 會顯示一頁指令。請複製 **"…or push an existing repository from the command line"** 下方的那兩行指令：

```bash
git remote add origin https://github.com/您的帳號/money.git
git push -u origin master
```

*(注意：需將連結中的 `您的帳號` 替換為您真實的 GitHub 帳號)*

**操作方式**：
1. 回到您的電腦資料夾。
2. 在空白處按右鍵 -> **在終端機開啟**。
3. 把剛剛複製的指令貼上並按 Enter。
4. 依據提示輸入您的 GitHub 帳號密碼 (或 Token)。

### 第三步：開啟 GitHub Pages (網頁託管)

1. 上傳成功後，回到 GitHub 網頁。
2. 點擊上方的 **Settings** (設定) 頁籤。
3. 在左側選單找到 **Pages** (在 "Code and automation" 區塊)。
4. 在 **Build and deployment** 下的 **Source** 選擇 `Deploy from a branch`。
5. 在 **Branch** 選單中，選擇 `master` 分支，然後點擊 **Save**。

### 第四步：完成！

等待約 1-2 分鐘後，重新整理該頁面。
上方會出現一行網址： `https://您的帳號.github.io/money/`

**您可以將這個網址傳給所有員工，他們就能用手機或電腦開始報帳了！**
不需要再開啟您的電腦當伺服器。

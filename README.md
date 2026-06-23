# AI超级获客系统

这是一个使用纯 HTML、CSS 和 JavaScript 构建的“AI超级获客系统”演示项目。

项目采用正式、商业化的招商落地页风格，面向实体店老板、培训机构、招商团队和营销公司，展示项目介绍、核心功能、获客流程、适合客户以及客户咨询信息表单。

## 如何打开

1. 下载或克隆本仓库。
2. 在文件管理器中找到 `index.html`。
3. 使用浏览器直接打开 `index.html` 即可查看演示页面。

也可以在本地启动任意静态文件服务器后访问该页面。

## 客户信息收集方式

表单已升级为适合新手的静态表单服务方案：默认预留 Formspree 接口位。上线前只需要把 `index.html` 表单里的 `action` 和 `script.js` 里的 `FORM_SERVICE_CONFIG.endpoint` 替换为你的 Formspree 表单地址即可。

推荐配置步骤：

1. 登录或注册 [Formspree](https://formspree.io/)。
2. 创建一个新表单，并绑定用于接收客户线索的邮箱。
3. 复制 Formspree 提供的表单地址，例如 `https://formspree.io/f/xxxxabcd`。
4. 将下面两个位置的 `https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID` 替换为真实地址：
   - `index.html` 中 `<form>` 的 `action`。
   - `script.js` 中 `FORM_SERVICE_CONFIG.endpoint`。

客户提交后会发送以下线索字段：

- 姓名：`name`
- 电话：`phone`
- 行业：`industry`
- 需求：`need`
- 提交时间：`submittedAt`

提交成功后，页面会提示：“提交成功，顾问将尽快联系您。”。

## 本地备份

为了避免网络或静态表单服务临时异常导致线索丢失，页面仍会把每次提交备份到浏览器 `localStorage` 的 `aiLeadCustomers` 字段中。未配置 Formspree 地址时，表单会先以本地备份方式运行，便于演示和测试。


## C1. 如何证明 Xero API 连接正常？
- 调用 **GET /Connections** 接口
- 如果返回组织信息，说明连接成功

---

## C2. 如果 `/connections` 正常，但 `GET /Invoices` 失败，检查内容
- OAuth 令牌是否有效或过期  
- 应用是否有发票读取权限（Scopes）  
- 是否使用正确的 `Xero-tenant-id`  
- 请求参数是否正确（状态、日期、编号等）  
- 是否被限流或服务端异常  

---

## C3. 检查发票应调用的端点
- **GET /Invoices** 获取发票列表

---

## C4. 检查特定发票
- **GET /Invoices/{InvoiceID}**  
- 或通过查询参数过滤，例如：`GET /Invoices?InvoiceNumber=XXX`

---

## C5. 发票 API 返回 429（Rate Limit）时处理方式
- 根据响应头 `Retry-After` 等待后重试  
- 使用请求队列控制调用频率  
- 后端实现限流策略，避免短时间内频繁调用
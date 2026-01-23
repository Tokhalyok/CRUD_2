# CRUD Project

## Как запустить

### Требования
- Node.js 20+
- .NET 9 SDK
- PostgreSQL 14+

### Быстрый старт (3 шага)

1. **Подготовка БД:**
   ```bash
   # В PostgreSQL создайте базу
   CREATE DATABASE productdb;
   ```

2. **Установка зависимостей:**
   ```bash
   # Backend
   cd ProductApi
   dotnet restore
   cd ..
   
   # Frontend
   cd ProductApp/product-client
   npm install
   ```

3. **Запуск:**
   ```bash
   # В одном терминале - Backend (из папки ProductApi)
   dotnet run
   
   # В другом терминале - Frontend (из папки ProductApp/product-client)
   npm start
   ```

**Backend будет доступен на:** http://localhost:5000  
**Frontend будет доступен на:** http://localhost:4200

Готово!
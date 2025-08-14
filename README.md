# Installation
#### Frontend
```
cd frontend
pnpm install
```
#### Backend
```
cd backend
pnpm install
```

# Backend create DB
```
npx prisma migrate dev --name init
```

# Backend seed DB
```
npx prisma db seed
```

# Running
#### Backend
```
pnpm run dev
```
#### Frontend
```
pnpm run dev
```
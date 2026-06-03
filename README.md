# Iran Virtual Clinic - MVP

## Overview

Iran Virtual Clinic (IVC) is a comprehensive telemedicine and electronic health record (EHR) platform designed specifically for Iran.

**Current Phase:** Phase 1 - Project Scaffold + Auth + RBAC

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 17 (at `C:\Program Files\PostgreSQL\17`)
- Password: `135353`

### Setup (Windows)

```powershell
# 1. Clone
cd C:\
rm -r clinic (if exists)
mkdir clinic
cd clinic
git clone https://github.com/rezaeirezaeirezaei/Virtual_clinic.git .

# 2. Install
npm install

# 3. Database
& "C:\Program Files\PostgreSQL\17\bin\createdb" -U postgres virtual_clinic

# 4. Prisma
npx prisma db push

# 5. Seed
npm run db:seed

# 6. Start
npm run dev
```

Visit: **http://localhost:3000**

## Tech Stack

- Next.js 15 + TypeScript + Tailwind
- PostgreSQL + Prisma ORM
- JWT Auth + OTP
- Mock SMS Provider

## Login Credentials

**Patient:** `9109876543` → OTP: any 6 digits
**Doctor:** `9121234567` → OTP: any 6 digits

## Documentation

See `docs/` folder for detailed setup guides.

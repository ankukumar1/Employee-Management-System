<div align="center">

# PeoplePulse · Employee Management System

**Modern workforce intelligence for HR, people operations, and leadership teams.**

</div>

## Overview

PeoplePulse is a Next.js application that centralises employee data in a single dashboard. The app surfaces workforce health metrics, offers powerful filtering, and highlights recent hires so teams can make informed decisions quickly.

## Features

- **Executive overview** · Quick-glance stats for total, active, and on-leave employees.
- **Interactive directory** · Search and filter employees by name, role, department, or status.
- **Status insights** · Visual summaries of workforce distribution using reusable stat cards.
- **Recent joiners** · Spotlight on latest hires, including role, department, and start date.
- **Tailwind-powered UI** · Responsive, accessible design aligned with the PeoplePulse brand.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to access the dashboard.

### 3. Build for production

```bash
npm run build
npm run start
```

## Available Scripts

- `npm run dev` · Start the development server with hot reloading.
- `npm run build` · Create an optimised production build.
- `npm run start` · Serve the production build.
- `npm run lint` · Run ESLint with Next.js defaults.
- `npm run test` · Execute the Vitest test suite in CI mode.
- `npm run test:watch` · Run tests with watch mode enabled.

## Architecture

- **Framework** · [`Next.js`](https://nextjs.org/) App Router with TypeScript.
- **UI** · [`Tailwind CSS`](https://tailwindcss.com/) v4 via the new PostCSS plugin pipeline.
- **Component library** · Custom reusable components in `src/components/`.
- **Data layer** · Static mock data and helpers located in `src/lib/`.
- **Testing** · [`Vitest`](https://vitest.dev/) and [`@testing-library/react`](https://testing-library.com/docs/react-testing-library/intro/).
- **Linting** · [`eslint-config-next`](https://nextjs.org/docs/app/building-your-application/configuring/eslint).

## Project Structure

```text
employee-managements/
├── public/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── EmployeeStatusCard.tsx
│   │   └── EmployeeTable.tsx
│   └── lib/
│       └── employees.ts
├── tests/
├── package.json
└── README.md
```

## Roadmap

- **Authentication & permissions** · Secure access for HR, managers, and employees.
- **Real data integrations** · Connect to HRIS, payroll, and performance tooling.
- **Advanced analytics** · Attrition forecasting, engagement metrics, and cohort trends.
- **Workflow automation** · Streamlined onboarding, offboarding, and review cycles.

## Contributing

1. Fork the repository and create a feature branch.
2. Add/modify tests where relevant.
3. Run `npm run lint` and `npm run test` before submitting a PR.

## License

This project is proprietary. All rights reserved by the PeoplePulse team.

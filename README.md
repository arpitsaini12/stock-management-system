# StockPilot

StockPilot is a frontend-only inventory management prototype. It runs in the browser with sample data and local demo state; it does not require a backend, database, API keys, or external services.

## Run locally

Open `index.html` in a modern browser. The app uses plain HTML, CSS, and JavaScript.

## Demo sign-in

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@stockpilot.in` | `admin123` |
| Employee | `employee@stockpilot.in` | `employee123` |

Authentication and role restrictions are for demonstration only. They are implemented in browser-side code and are not secure. Do not use real credentials or sensitive business data.

## Features

- Dashboard, products, categories, inventory, stock movements, suppliers, purchase orders, sales and stock issues, warehouses, reports, settings, and employee management.
- Role-based demo navigation and actions, with employee accounts managed locally by the admin demo.
- Interactive workflows using shared demo state, CSV exports, search, filtering, and responsive layouts.
- INR currency formatting by default and local browser storage for demo preferences and changes.

All records are sample data. Changes made in the prototype are local to the browser and are not sent to a server.

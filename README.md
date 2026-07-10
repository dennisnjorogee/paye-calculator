# Net Pay Calculator

A comprehensive PAYE (Pay As You Earn) tax calculator for Kenya, calculating statutory deductions based on the latest KRA guidelines.

## Overview

This project provides both a web-based UI and a REST API for calculating net pay in Kenya. It accurately computes:

- **PAYE Tax** - Pay As You Earn income tax with personal relief
- **NSSF Contributions** - National Social Security Fund deductions
- **SHIF** - Social Health Insurance Fund deductions
- **Housing Levy** - New housing and settlement fund levy (1.5% of gross pay)
- **Net Pay** - Final disbursement amount after all statutory deductions

## Features

- Accurate PAYE calculations based on current KRA tax brackets
- Automatic NSSF, SHIF, and Housing Levy calculations
- Individual deduction calculators for each tax component
- Bulk calculation API for processing multiple employees
- Responsive web interface for manual calculations
- RESTful API with validation middleware
- Comprehensive documentation

## Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Templating**: EJS
- **Security**: Helmet.js
- **Other**: CORS, dotenv

## Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Setup

1. Clone the repository:

```bash
git clone https://github.com/dennesnjoroge/paye-calculator.git
cd paye-calculator
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
```

4. Start the application:

```bash
npm start          # Production
npm run dev        # Development (with auto-reload)
```

The application will be available at `http://localhost:3000`

## Usage

### Web Interface

Access individual calculators via the web UI:

- **Home** - `http://localhost:3000/`
- **Gross Pay Calculator** - `http://localhost:3000/gross-pay-calculator`
- **NSSF Calculator** - `http://localhost:3000/nssf-calculator`
- **SHIF Calculator** - `http://localhost:3000/shif-calculator`
- **Housing Levy Calculator** - `http://localhost:3000/housing-levy-calculator`
- **Documentation** - `http://localhost:3000/docs`

### API Endpoints

#### Bulk Calculate Payroll

**POST** `/api/v1/bulk-calculate`

Calculate net pay for multiple employees in a single request.

**Request Body:**

```json
{
  "employees": [
    {
      "employeePin": "A001234567X",
      "period": "2026-06",
      "basicPay": 35000.0,
      "allowances": 0.0
    },
    {
      "employeePin": "A001234568X",
      "period": "2026-06",
      "basicPay": 50000.0,
      "allowances": 5000.0
    }
  ]
}
```

**Response:**

```json
{
  "status": "success",
  "data": [
    {
      "employeePin": "A001234567X",
      "period": "2026-06",
      "earnings": {
        "basicPay": 35000.0,
        "allowances": 0.0,
        "grossPay": 35000.0
      },
      "preTaxDeductions": {
        "nssf": 2100.0,
        "shif": 962.5,
        "housingLevy": 525.0,
        "totalPreTax": 3587.5
      },
      "taxComputation": {
        "taxableIncome": 31412.5,
        "grossIncomeTax": 4253.0,
        "personalRelief": 2400.0,
        "payeOwed": 1853.0
      },
      "postTaxDeductions": {
        "helb": 0.0,
        "saccoShares": 0.0,
        "otherLoans": 0.0,
        "totalPostTax": 0.0
      },
      "totals": {
        "statutoryDeductions": 5440.5,
        "grandTotalDeductions": 5440.5
      },
      "disbursement": {
        "netPay": 29559.5,
        "currency": "KES"
      }
    }
  ]
}
```

## Project Structure

```
├── index.js                    # Main application entry point
├── package.json               # Project dependencies
├── meta.json                  # Example output format
├── public/                    # Static assets
│   └── css/
│       └── style.css         # Styling
├── src/
│   ├── api/                  # REST API endpoints
│   │   ├── config/           # Tax rates and constants
│   │   │   ├── housing-levy-rates.json
│   │   │   ├── nssf-rates.json
│   │   │   ├── paye-rates.json
│   │   │   └── shif-rates.json
│   │   ├── controllers/      # API request handlers
│   │   ├── middlewares/      # Validation middleware
│   │   ├── modules/          # Tax calculation modules
│   │   │   ├── housingLevy/
│   │   │   ├── NSSF/
│   │   │   ├── PAYE/
│   │   │   └── SHIF/
│   │   ├── routes/           # API routes
│   │   ├── services/         # Business logic
│   │   └── utils/            # Utilities (error handling)
│   └── app/                  # Web UI
│       ├── controllers/      # UI request handlers
│       └── routes/           # Web routes
└── views/                    # EJS templates
    ├── home/
    ├── gross/
    ├── nssf/
    ├── shif/
    ├── housing-levy/
    ├── docs/
    └── shared/
```

## Tax Rates Configuration

Tax rates are configured in JSON files under `src/api/config/`:

- **PAYE Rates** - `paye-rates.json` - Income tax brackets and rates
- **NSSF Rates** - `nssf-rates.json` - Social security contribution brackets
- **SHIF Rates** - `shif-rates.json` - Health insurance contribution rates
- **Housing Levy** - `housing-levy-rates.json` - Housing levy percentages

These rates are based on the latest KRA guidelines and can be updated as needed.

## Deduction Details

### Pre-Tax Deductions (Reduce Taxable Income)

- NSSF contributions
- SHIF contributions
- Housing Levy

### Tax Computation

- Applied to (Gross Pay - Pre-Tax Deductions)
- Includes personal relief of KES 2,400

### Post-Tax Deductions

- HELB loans
- SACCO shares
- Other loan deductions

## Error Handling

The API validates all requests and returns structured error responses:

```json
{
  "status": "fail",
  "message": "Invalid request data"
}
```

Common validation errors:

- Missing required fields
- Invalid employee PIN format
- Negative salary amounts
- Invalid date format

## Development

### Scripts

```bash
npm start      # Start production server
npm run dev    # Start development server with auto-reload
npm test       # Run tests (currently placeholder)
```

### Building

No build step required. The application uses ES Modules and runs directly with Node.js.

## License

MIT - See LICENSE file for details

## Author

**Dennis Njoroge**  
Email: dennesmwangi55@gmail.com  
GitHub: [dennesnjoroge](https://github.com/dennesnjoroge)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Links

- **Repository**: https://github.com/dennesnjoroge/paye-calculator
- **Issues**: https://github.com/dennesnjoroge/paye-calculator/issues
- **Homepage**: https://github.com/dennesnjoroge/paye-calculator#readme

---

**Disclaimer**: This calculator is based on current KRA guidelines. Always verify calculations with official KRA resources and consult with a tax professional for accurate tax planning.

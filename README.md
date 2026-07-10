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
- **Gross Pay Calculator** - `http://localhost:3000/net-pay-calculator`
- **NSSF Calculator** - `http://localhost:3000/nssf-calculator`
- **SHIF Calculator** - `http://localhost:3000/shif-calculator`
- **Housing Levy Calculator** - `http://localhost:3000/housing-levy-calculator`
- **Documentation** - `http://localhost:3000/docs`

### API Endpoints

#### Bulk Calculate Payroll

**POST** `/api/v1/bulk-calculate`

Calculate tax calculations from a single endpoint / request.

##### Supported Calculations

The following calculations are supported. Each calculation is represented by a given service code.

-NSSF

-SHIF

-HOUSING LEVY

-NETPAY

Include a service code for every request

##### Valid Service Codes

**NSSF**
-serviceCode: "NSSF"

**SHIF**
-serviceCode: "SHIF"

**HOUSING LEVY**
-serviceCode: "HOUSINGLEVY"

**NET PAY**
-serviceCode: "NETPAY"

**Request Body:**

```json
{
  "serviceCode": "NETPAY",
  "grossPay": 35000.0
}
```

**Response:**

```json
{
  "status": "success",
  "data": {
    "serviceCode": "NETPAY",
    "earnings": {
      "grossPay": 35000
    },
    "preTaxDeductions": {
      "nssf": 2100,
      "shif": 962.5,
      "housingLevy": 525,
      "totalPreTax": 3587.5
    },
    "payeDeductions": {
      "taxableIncome": 31412.5,
      "incomeTax": "4253.13",
      "personalRelief": 2400,
      "payeTotal": 1853.13
    },
    "netPay": 29559.37
  }
}
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

---

**Disclaimer**: This calculator is based on current KRA guidelines. Always verify calculations with official KRA resources and consult with a tax professional for accurate tax planning.

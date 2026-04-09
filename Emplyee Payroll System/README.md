# Interactive Employee Payroll System

A command-line based employee payroll system that allows you to interactively manage employees and process payroll.

## Features

- ✅ **Add Employees**: Input employee details through prompts
- ✅ **Remove Employees**: Remove employees by ID
- ✅ **Update Employees**: Modify employee information
- ✅ **List Employees**: View all current employees
- ✅ **Process Payroll**: Generate payslips for all employees
- ✅ **Payroll Summary**: View total payroll statistics
- ✅ **View Details**: Check individual employee information
- ✅ **Interactive CLI**: User-friendly command-line interface

## How to Run

### Prerequisites
- Node.js installed on your system

### Start the System
```bash
cd "c:\Users\namde\OneDrive\Desktop\Emplyee Payroll System"
node index.js
```

Or using npm:
```bash
npm start
```

## Menu Options

### 1. Add Employee
- Enter employee name
- Enter base salary (monthly)
- Enter hours worked (default: 160)
- Enter overtime hours (default: 0)

### 2. Remove Employee
- Enter the employee ID to remove

### 3. Update Employee
- Enter employee ID
- Update salary, hours, or overtime as needed

### 4. List All Employees
- Displays all current employees with ID, name, and salary

### 5. Process Payroll
- Generates payslips showing:
  - Gross pay (base + overtime)
  - Taxes (20% income + 5% social security)
  - Deductions and benefits
  - Net pay

### 6. Generate Payroll Summary
- Shows totals for all employees:
  - Total number of employees
  - Total gross pay
  - Total net pay
  - Total taxes

### 7. View Employee Details
- Enter employee ID to see full details and current pay information

### 8. Exit
- Closes the application

## Calculation Details

- **Overtime Rate**: 1.5x regular hourly rate (assuming 160 hours/month)
- **Taxes**: 20% income tax + 5% social security
- **Deductions**: Can be set per employee (health insurance, etc.)
- **Benefits**: Can be set per employee (bonuses, allowances)

## Example Usage

```
🚀 Welcome to Employee Payroll System!
=====================================

📋 Main Menu:
1. Add Employee
2. Remove Employee
3. Update Employee
4. List All Employees
5. Process Payroll
6. Generate Payroll Summary
7. View Employee Details
8. Exit

Choose an option (1-8): 1
Enter employee name: John Doe
Enter base salary: 3000
Enter hours worked (default 160): 160
Enter overtime hours (default 0): 10

✅ Employee John Doe added successfully with ID: 1
```

## File Structure

- `index.js` - Main interactive payroll application
- `package.json` - Node.js project configuration

## Future Enhancements

- Data persistence (save to file/database)
- More complex tax calculations
- Employee benefits management
- Payroll scheduling
- Export reports to CSV/PDF
- Web interface</content>
<parameter name="filePath">c:\Users\namde\OneDrive\Desktop\Emplyee Payroll System\README.md
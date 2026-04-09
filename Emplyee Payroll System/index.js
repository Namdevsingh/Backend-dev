const readline = require('readline');

// Employee Payroll System

class Employee {
    constructor(id, name, baseSalary, hoursWorked = 0, overtimeHours = 0) {
        this.id = id;
        this.name = name;
        this.baseSalary = baseSalary;
        this.hoursWorked = hoursWorked;
        this.overtimeHours = overtimeHours;
        this.deductions = 0;
        this.benefits = 0;
    }

    // Calculate gross pay including overtime
    calculateGrossPay() {
        const regularPay = this.baseSalary;
        const overtimeRate = this.baseSalary / 160 * 1.5; // Assuming 160 hours/month, 1.5x overtime
        const overtimePay = this.overtimeHours * overtimeRate;
        return regularPay + overtimePay;
    }

    // Calculate taxes (simplified: 20% income tax + 5% social security)
    calculateTaxes(grossPay) {
        const incomeTax = grossPay * 0.20;
        const socialSecurity = grossPay * 0.05;
        return incomeTax + socialSecurity;
    }

    // Calculate net pay
    calculateNetPay() {
        const grossPay = this.calculateGrossPay();
        const taxes = this.calculateTaxes(grossPay);
        const totalDeductions = taxes + this.deductions;
        return grossPay - totalDeductions + this.benefits;
    }

    // Generate payslip
    generatePayslip() {
        const grossPay = this.calculateGrossPay();
        const taxes = this.calculateTaxes(grossPay);
        const netPay = this.calculateNetPay();

        return {
            employeeId: this.id,
            employeeName: this.name,
            grossPay: grossPay.toFixed(2),
            taxes: taxes.toFixed(2),
            deductions: this.deductions.toFixed(2),
            benefits: this.benefits.toFixed(2),
            netPay: netPay.toFixed(2)
        };
    }
}

// Payroll System Manager
class PayrollSystem {
    constructor() {
        this.employees = [];
        this.nextId = 1;
    }

    // Add employee
    addEmployee(employee) {
        this.employees.push(employee);
        console.log(`✅ Employee ${employee.name} added successfully with ID: ${employee.id}`);
    }

    // Remove employee
    removeEmployee(employeeId) {
        const index = this.employees.findIndex(emp => emp.id === employeeId);
        if (index !== -1) {
            const removed = this.employees.splice(index, 1);
            console.log(`✅ Employee ${removed[0].name} removed successfully.`);
        } else {
            console.log(`❌ Employee with ID ${employeeId} not found.`);
        }
    }

    // Update employee details
    updateEmployee(employeeId, updates) {
        const employee = this.employees.find(emp => emp.id === employeeId);
        if (employee) {
            Object.assign(employee, updates);
            console.log(`✅ Employee ${employee.name} updated successfully.`);
        } else {
            console.log(`❌ Employee with ID ${employeeId} not found.`);
        }
    }

    // Process payroll for all employees
    processPayroll() {
        if (this.employees.length === 0) {
            console.log('❌ No employees found. Please add employees first.');
            return [];
        }

        const payrollReport = this.employees.map(employee => employee.generatePayslip());
        return payrollReport;
    }

    // Generate payroll summary
    generatePayrollSummary() {
        if (this.employees.length === 0) {
            console.log('❌ No employees found. Please add employees first.');
            return null;
        }

        const totalGross = this.employees.reduce((sum, emp) => sum + emp.calculateGrossPay(), 0);
        const totalNet = this.employees.reduce((sum, emp) => sum + emp.calculateNetPay(), 0);
        const totalTaxes = this.employees.reduce((sum, emp) => sum + emp.calculateTaxes(emp.calculateGrossPay()), 0);

        return {
            totalEmployees: this.employees.length,
            totalGrossPay: totalGross.toFixed(2),
            totalNetPay: totalNet.toFixed(2),
            totalTaxes: totalTaxes.toFixed(2)
        };
    }

    // Find employee by ID
    findEmployee(employeeId) {
        return this.employees.find(emp => emp.id === employeeId);
    }

    // List all employees
    listEmployees() {
        if (this.employees.length === 0) {
            console.log('❌ No employees found.');
            return [];
        }

        console.log('\n📋 Employee List:');
        this.employees.forEach(emp => {
            console.log(`ID: ${emp.id}, Name: ${emp.name}, Base Salary: $${emp.baseSalary}`);
        });

        return this.employees.map(emp => ({
            id: emp.id,
            name: emp.name,
            baseSalary: emp.baseSalary
        }));
    }

    // Get next available ID
    getNextId() {
        return this.nextId++;
    }
}

// Interactive CLI Interface
class PayrollCLI {
    constructor() {
        this.payrollSystem = new PayrollSystem();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    // Start the CLI
    start() {
        console.log('🚀 Welcome to Employee Payroll System!');
        console.log('=====================================');
        this.showMenu();
    }

    // Show main menu
    showMenu() {
        console.log('\n📋 Main Menu:');
        console.log('1. Add Employee');
        console.log('2. Remove Employee');
        console.log('3. Update Employee');
        console.log('4. List All Employees');
        console.log('5. Process Payroll');
        console.log('6. Generate Payroll Summary');
        console.log('7. View Employee Details');
        console.log('8. Exit');

        this.rl.question('\nChoose an option (1-8): ', (choice) => {
            this.handleMenuChoice(choice);
        });
    }

    // Handle menu choice
    handleMenuChoice(choice) {
        switch (choice) {
            case '1':
                this.addEmployeePrompt();
                break;
            case '2':
                this.removeEmployeePrompt();
                break;
            case '3':
                this.updateEmployeePrompt();
                break;
            case '4':
                this.payrollSystem.listEmployees();
                this.showMenu();
                break;
            case '5':
                this.processPayroll();
                break;
            case '6':
                this.generateSummary();
                break;
            case '7':
                this.viewEmployeePrompt();
                break;
            case '8':
                console.log('👋 Thank you for using Employee Payroll System!');
                this.rl.close();
                break;
            default:
                console.log('❌ Invalid choice. Please try again.');
                this.showMenu();
        }
    }

    // Add employee prompt
    addEmployeePrompt() {
        this.rl.question('Enter employee name: ', (name) => {
            if (!name.trim()) {
                console.log('❌ Name cannot be empty.');
                this.showMenu();
                return;
            }

            this.rl.question('Enter base salary: ', (salary) => {
                const baseSalary = parseFloat(salary);
                if (isNaN(baseSalary) || baseSalary <= 0) {
                    console.log('❌ Invalid salary. Please enter a positive number.');
                    this.showMenu();
                    return;
                }

                this.rl.question('Enter hours worked (default 160): ', (hours) => {
                    const hoursWorked = hours ? parseFloat(hours) : 160;
                    if (isNaN(hoursWorked) || hoursWorked < 0) {
                        console.log('❌ Invalid hours. Using default 160 hours.');
                    }

                    this.rl.question('Enter overtime hours (default 0): ', (overtime) => {
                        const overtimeHours = overtime ? parseFloat(overtime) : 0;
                        if (isNaN(overtimeHours) || overtimeHours < 0) {
                            console.log('❌ Invalid overtime hours. Using 0.');
                        }

                        const employee = new Employee(
                            this.payrollSystem.getNextId(),
                            name.trim(),
                            baseSalary,
                            hoursWorked || 160,
                            overtimeHours || 0
                        );

                        this.payrollSystem.addEmployee(employee);
                        this.showMenu();
                    });
                });
            });
        });
    }

    // Remove employee prompt
    removeEmployeePrompt() {
        this.rl.question('Enter employee ID to remove: ', (id) => {
            const employeeId = parseInt(id);
            if (isNaN(employeeId)) {
                console.log('❌ Invalid ID. Please enter a number.');
                this.showMenu();
                return;
            }

            this.payrollSystem.removeEmployee(employeeId);
            this.showMenu();
        });
    }

    // Update employee prompt
    updateEmployeePrompt() {
        this.rl.question('Enter employee ID to update: ', (id) => {
            const employeeId = parseInt(id);
            if (isNaN(employeeId)) {
                console.log('❌ Invalid ID. Please enter a number.');
                this.showMenu();
                return;
            }

            const employee = this.payrollSystem.findEmployee(employeeId);
            if (!employee) {
                console.log(`❌ Employee with ID ${employeeId} not found.`);
                this.showMenu();
                return;
            }

            console.log(`\nCurrent details for ${employee.name}:`);
            console.log(`Base Salary: $${employee.baseSalary}`);
            console.log(`Hours Worked: ${employee.hoursWorked}`);
            console.log(`Overtime Hours: ${employee.overtimeHours}`);

            this.rl.question('Enter new base salary (press Enter to keep current): ', (salary) => {
                const updates = {};

                if (salary.trim()) {
                    const newSalary = parseFloat(salary);
                    if (!isNaN(newSalary) && newSalary > 0) {
                        updates.baseSalary = newSalary;
                    }
                }

                this.rl.question('Enter new hours worked (press Enter to keep current): ', (hours) => {
                    if (hours.trim()) {
                        const newHours = parseFloat(hours);
                        if (!isNaN(newHours) && newHours >= 0) {
                            updates.hoursWorked = newHours;
                        }
                    }

                    this.rl.question('Enter new overtime hours (press Enter to keep current): ', (overtime) => {
                        if (overtime.trim()) {
                            const newOvertime = parseFloat(overtime);
                            if (!isNaN(newOvertime) && newOvertime >= 0) {
                                updates.overtimeHours = newOvertime;
                            }
                        }

                        if (Object.keys(updates).length > 0) {
                            this.payrollSystem.updateEmployee(employeeId, updates);
                        } else {
                            console.log('ℹ️ No changes made.');
                        }

                        this.showMenu();
                    });
                });
            });
        });
    }

    // Process payroll
    processPayroll() {
        const report = this.payrollSystem.processPayroll();
        if (report.length > 0) {
            console.log('\n💰 Payroll Report:');
            console.log('==================');
            report.forEach(payslip => {
                console.log(`\n👤 Employee: ${payslip.employeeName} (ID: ${payslip.employeeId})`);
                console.log(`💵 Gross Pay: $${payslip.grossPay}`);
                console.log(`💸 Taxes: $${payslip.taxes}`);
                console.log(`📉 Deductions: $${payslip.deductions}`);
                console.log(`🎁 Benefits: $${payslip.benefits}`);
                console.log(`💰 Net Pay: $${payslip.netPay}`);
                console.log('─'.repeat(40));
            });
        }
        this.showMenu();
    }

    // Generate summary
    generateSummary() {
        const summary = this.payrollSystem.generatePayrollSummary();
        if (summary) {
            console.log('\n📊 Payroll Summary:');
            console.log('===================');
            console.log(`👥 Total Employees: ${summary.totalEmployees}`);
            console.log(`💵 Total Gross Pay: $${summary.totalGrossPay}`);
            console.log(`💰 Total Net Pay: $${summary.totalNetPay}`);
            console.log(`💸 Total Taxes: $${summary.totalTaxes}`);
        }
        this.showMenu();
    }

    // View employee details
    viewEmployeePrompt() {
        this.rl.question('Enter employee ID to view details: ', (id) => {
            const employeeId = parseInt(id);
            if (isNaN(employeeId)) {
                console.log('❌ Invalid ID. Please enter a number.');
                this.showMenu();
                return;
            }

            const employee = this.payrollSystem.findEmployee(employeeId);
            if (employee) {
                console.log(`\n👤 Employee Details:`);
                console.log('===================');
                console.log(`ID: ${employee.id}`);
                console.log(`Name: ${employee.name}`);
                console.log(`Base Salary: $${employee.baseSalary}`);
                console.log(`Hours Worked: ${employee.hoursWorked}`);
                console.log(`Overtime Hours: ${employee.overtimeHours}`);
                console.log(`Deductions: $${employee.deductions}`);
                console.log(`Benefits: $${employee.benefits}`);

                const payslip = employee.generatePayslip();
                console.log(`\n💰 Current Pay Information:`);
                console.log(`Gross Pay: $${payslip.grossPay}`);
                console.log(`Net Pay: $${payslip.netPay}`);
            } else {
                console.log(`❌ Employee with ID ${employeeId} not found.`);
            }

            this.showMenu();
        });
    }
}

// Start the application
const cli = new PayrollCLI();
cli.start();
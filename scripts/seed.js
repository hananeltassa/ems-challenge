import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbConfigPath = path.join(__dirname, '../database.yaml');
const dbConfig = yaml.load(fs.readFileSync(dbConfigPath, 'utf8'));

const { sqlite_path: sqlitePath } = dbConfig;
const db = new sqlite3.Database(sqlitePath);

const employees = [
  {
    full_name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '1234567890',
    date_of_birth: '1990-05-15',
    job_title: 'Software Engineer',
    department: 'IT',
    salary: 60000,
    start_date: '2023-01-10',
  },
  {
    full_name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '0987654321',
    date_of_birth: '1985-07-22',
    job_title: 'HR Manager',
    department: 'HR',
    salary: 70000,
    start_date: '2021-06-15',
  },
  {
    full_name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    phone: '1112223333',
    date_of_birth: '1992-09-30',
    job_title: 'Marketing Specialist',
    department: 'Marketing',
    salary: 55000,
    start_date: '2022-03-01',
  },
];

const insertEmployees = () => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(`
      INSERT INTO employees (full_name, email, phone, date_of_birth, job_title, department, salary, start_date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    let insertedIds = [];
    employees.forEach((emp, index) => {
      stmt.run(
        [emp.full_name, emp.email, emp.phone, emp.date_of_birth, emp.job_title, emp.department, emp.salary, emp.start_date],
        function (err) {
          if (err) reject(err);
          insertedIds.push(this.lastID);
          if (insertedIds.length === employees.length) resolve(insertedIds);
        }
      );
    });

    stmt.finalize();
  });
};

const insertTimesheets = (employeeIds) => {
  return new Promise((resolve, reject) => {
    const timesheets = [
      { employee_id: employeeIds[0], start_time: '2025-02-10 08:00:00', end_time: '2025-02-10 17:00:00' },
      { employee_id: employeeIds[1], start_time: '2025-02-11 12:00:00', end_time: '2025-02-11 17:00:00' },
      { employee_id: employeeIds[2], start_time: '2025-02-12 07:00:00', end_time: '2025-02-12 16:00:00' },
    ];

    const stmt = db.prepare(`INSERT INTO timesheets (employee_id, start_time, end_time) VALUES (?, ?, ?)`);

    timesheets.forEach((ts, index) => {
      stmt.run([ts.employee_id, ts.start_time, ts.end_time], function (err) {
        if (err) reject(err);
        if (index === timesheets.length - 1) resolve();
      });
    });

    stmt.finalize();
  });
};

db.serialize(async () => {
  try {
    const employeeIds = await insertEmployees();
    await insertTimesheets(employeeIds);
    console.log('Database seeded successfully.');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    db.close();
  }
});

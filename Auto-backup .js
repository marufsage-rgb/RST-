// Auto-backup every 5 minutes
let autoBackupInterval;
let lastBackupTime;

function autoBackup() {
  const backup = {
    timestamp: new Date().toISOString(),
    data: {
      products, customers, invoices, purchases, incomeExpense, 
      cashTransfers, bankTransactions, employees, attendance, 
      salaries, branches, itemTransfers, damageEntries, warranties, 
      installments, targets, smsLogs, utilityBills, recharges, 
      categories, brands, auditLogs, users, config: CONFIG, notifications
    }
  };
  // Store in localStorage with rotation
  let backups = JSON.parse(localStorage.getItem('auto_backups') || '[]');
  backups.unshift(backup);
  if (backups.length > 10) backups = backups.slice(0, 10); // Keep last 10
  localStorage.setItem('auto_backups', JSON.stringify(backups));
  lastBackupTime = new Date();
  updateBackupIndicator();
}

function startAutoBackup(intervalMinutes = 5) {
  if (autoBackupInterval) clearInterval(autoBackupInterval);
  autoBackupInterval = setInterval(autoBackup, intervalMinutes * 60 * 1000);
}
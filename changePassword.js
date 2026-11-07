function changePassword(userId, oldPassword, newPassword) {
  const user = users.find(u => u.id === userId);
  if (!user) return { success: false, error: 'User not found' };
  if (user.password !== oldPassword) return { success: false, error: 'Current password incorrect' };
  if (newPassword.length < 6) return { success: false, error: 'Password too short' };
  user.password = newPassword;
  saveAll();
  return { success: true };
}

function resetPasswordViaEmail(email) {
  const user = users.find(u => u.email === email && !u.is_deleted);
  if (!user) return { success: false, error: 'Email not found' };
  // Generate reset code
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  user.reset_code = code;
  user.reset_expires = Date.now() + 15 * 60 * 1000; // 15 min
  saveAll();
  // Send email via EmailJS
  sendResetEmail(user, code);
  return { success: true, code }; // In production, don't return code
}
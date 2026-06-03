import crypto from 'crypto';

interface OTPStore {
  [phone: string]: {
    code: string;
    expiresAt: number;
    attempts: number;
  };
}

// In-memory store (replace with Redis for production)
const otpStore: OTPStore = {};

const OTP_LENGTH = 6;
const OTP_EXPIRE_MINUTES = parseInt(process.env.OTP_EXPIRE_MINUTES || '10');
const MAX_ATTEMPTS = 5;

export function generateOTP(): string {
  return crypto.randomInt(0, 1000000).toString().padStart(OTP_LENGTH, '0');
}

export function storeOTP(phone: string): string {
  const code = generateOTP();
  const expiresAt = Date.now() + OTP_EXPIRE_MINUTES * 60 * 1000;

  otpStore[phone] = {
    code,
    expiresAt,
    attempts: 0,
  };

  console.log(`[OTP] Generated for ${phone}: ${code}`);
  return code;
}

export function verifyOTP(phone: string, code: string): { valid: boolean; message: string } {
  const entry = otpStore[phone];

  if (!entry) {
    return { valid: false, message: 'OTP not found or expired' };
  }

  if (Date.now() > entry.expiresAt) {
    delete otpStore[phone];
    return { valid: false, message: 'OTP expired' };
  }

  if (entry.attempts >= MAX_ATTEMPTS) {
    delete otpStore[phone];
    return { valid: false, message: 'Too many attempts' };
  }

  entry.attempts++;

  if (entry.code !== code) {
    return { valid: false, message: 'Invalid OTP code' };
  }

  delete otpStore[phone];
  return { valid: true, message: 'OTP verified' };
}

export function clearOTP(phone: string): void {
  delete otpStore[phone];
}

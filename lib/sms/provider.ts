export interface SMSProvider {
  sendOTP(phone: string, code: string): Promise<{ success: boolean; messageId: string }>;
}

class MockSMSProvider implements SMSProvider {
  async sendOTP(phone: string, code: string): Promise<{ success: boolean; messageId: string }> {
    const messageId = `mock-${Date.now()}`;
    console.log(`[SMS Mock] Sending OTP to ${phone}: ${code} (ID: ${messageId})`);
    
    // Log to file for debugging (optional)
    if (process.env.MOCK_SMS_LOG_FILE) {
      try {
        const fs = await import('fs').then(m => m.promises);
        const logEntry = `[${new Date().toISOString()}] Phone: ${phone}, Code: ${code}\n`;
        await fs.appendFile(process.env.MOCK_SMS_LOG_FILE, logEntry);
      } catch (e) {
        // Silently fail if logging fails
      }
    }

    return { success: true, messageId };
  }
}

let smsProvider: SMSProvider;

export function getSMSProvider(): SMSProvider {
  if (!smsProvider) {
    if (process.env.MOCK_SMS_ENABLED === 'true') {
      smsProvider = new MockSMSProvider();
    } else {
      // TODO: Add real SMS provider (Kavenegar, etc.)
      throw new Error('SMS provider not configured');
    }
  }
  return smsProvider;
}

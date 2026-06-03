import { NextRequest, NextResponse } from 'next/server';
import { storeOTP } from '@/lib/auth/otp';
import { getSMSProvider } from '@/lib/sms/provider';
import { prisma } from '@/lib/db/prisma';

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json();

    // Validate phone
    if (!phone || !/^\d{10}$/.test(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Generate and store OTP
    const code = storeOTP(phone);

    // Send via SMS provider
    const smsProvider = getSMSProvider();
    const { success, messageId } = await smsProvider.sendOTP(phone, code);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to send OTP' },
        { status: 500 }
      );
    }

    // Log audit
    const user = await prisma.user.findUnique({ where: { phone } });
    if (user) {
      await prisma.auditLog.create({
        data: {
          userId: user.id,
          action: 'REQUEST_OTP',
          metaJSON: { messageId },
        },
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'OTP sent successfully',
        messageId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[OTP Request Error]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

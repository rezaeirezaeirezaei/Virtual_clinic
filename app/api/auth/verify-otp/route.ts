import { NextRequest, NextResponse } from 'next/server';
import { verifyOTP } from '@/lib/auth/otp';
import { generateJWT, setCookie } from '@/lib/auth/session';
import { prisma } from '@/lib/db/prisma';
import { UserRole } from '@prisma/client';

export async function POST(req: NextRequest) {
  try {
    const { phone, code } = await req.json();

    // Validate input
    if (!phone || !code) {
      return NextResponse.json(
        { error: 'Phone and code are required' },
        { status: 400 }
      );
    }

    // Verify OTP
    const result = verifyOTP(phone, code);
    if (!result.valid) {
      return NextResponse.json(
        { error: result.message },
        { status: 401 }
      );
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { phone },
      include: { patientProfile: true, doctorProfile: true },
    });

    if (!user) {
      // Create new patient by default
      user = await prisma.user.create({
        data: {
          phone,
          role: UserRole.PATIENT,
        },
        include: { patientProfile: true, doctorProfile: true },
      });
    }

    // Generate JWT
    const token = generateJWT(user.id, user.phone, user.role);

    // Log audit
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'LOGIN',
      },
    });

    // Set cookie and return response
    const response = NextResponse.json(
      {
        success: true,
        token,
        user: {
          id: user.id,
          phone: user.phone,
          role: user.role,
        },
      },
      { status: 200 }
    );

    return setCookie(response, token);
  } catch (error) {
    console.error('[OTP Verify Error]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

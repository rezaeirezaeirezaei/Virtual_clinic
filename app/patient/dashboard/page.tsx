'use client';

import { useEffect, useState } from 'react';

export default function PatientDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch user from API
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">درحال بارگذاری...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">داشبورد بیمار</h1>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-4">پروفایل</h2>
            <p className="text-gray-600">Phase 2: Profile management</p>
          </div>

          {/* Intake Card */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-4">تاریخچه بیماری</h2>
            <p className="text-gray-600">Phase 2: Fixed intake form</p>
          </div>

          {/* Appointments Card */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-4">نوبت‌ها</h2>
            <p className="text-gray-600">Phase 3: Appointment booking</p>
          </div>
        </div>
      </div>
    </div>
  );
}

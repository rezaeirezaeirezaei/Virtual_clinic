'use client';

import { useEffect, useState } from 'react';

export default function DoctorDashboard() {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">داشبورد پزشک</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Appointments Card */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-4">نوبت‌های رزرو‌شده</h2>
            <p className="text-gray-600">Phase 3: Appointment list</p>
          </div>

          {/* Guidelines Card */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-4">روال‌های بالینی</h2>
            <p className="text-gray-600">Phase 6: Guideline upload</p>
          </div>
        </div>
      </div>
    </div>
  );
}

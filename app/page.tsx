import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-700">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-white text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">کلینیک مجازی ایران</h1>
          <p className="text-xl opacity-90">پلتفرم تله‌پزشکی و سوابق الکترونیک سلامت</p>
        </div>

        {/* Main CTA */}
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-16">
          {/* Patient */}
          <Link
            href="/auth/patient-login"
            className="group bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all"
          >
            <div className="text-center">
              <div className="text-4xl mb-4">👤</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">بیمار</h2>
              <p className="text-gray-600 mb-6">
                ورود به پروفایل شخصی و رزرو نوبت ملاقات
              </p>
              <button className="btn btn-primary w-full group-hover:scale-105 transition-transform">
                ورود بیمار
              </button>
            </div>
          </Link>

          {/* Doctor */}
          <Link
            href="/auth/doctor-login"
            className="group bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all"
          >
            <div className="text-center">
              <div className="text-4xl mb-4">👨‍⚕️</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">پزشک</h2>
              <p className="text-gray-600 mb-6">
                ورود به داشبورد و مدیریت بیماران
              </p>
              <button className="btn btn-primary w-full group-hover:scale-105 transition-transform">
                ورود پزشک
              </button>
            </div>
          </Link>
        </div>

        {/* Features */}
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">ویژگی‌ها</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="text-2xl">🔐</div>
              <div>
                <h4 className="font-bold text-gray-900">ورود امن</h4>
                <p className="text-sm text-gray-600">احراز هویت با کد یکبار مصرف</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-2xl">📅</div>
              <div>
                <h4 className="font-bold text-gray-900">رزرو نوبت</h4>
                <p className="text-sm text-gray-600">نوبت‌بندی آنلاین با پرداخت</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-2xl">🎥</div>
              <div>
                <h4 className="font-bold text-gray-900">مشاوره ویدیویی</h4>
                <p className="text-sm text-gray-600">ویدیو و صوت و چت آنلاین</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-2xl">📄</div>
              <div>
                <h4 className="font-bold text-gray-900">سوابق الکترونیک</h4>
                <p className="text-sm text-gray-600">مدیریت اطلاعات سلامت</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

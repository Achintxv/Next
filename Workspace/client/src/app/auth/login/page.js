"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = await loginUser(form);

      login(data.user, data.token);

      document.cookie = `token=${data.token}; path=/`;

      router.replace("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FAF8F4] text-[#29251F]">
      {/* =====================================================
        AMBIENT BACKGROUND
    ====================================================== */}

      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-orange-200/30 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-amber-100/40 blur-3xl" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-100/20 blur-3xl" />

      {/* =====================================================
        MAIN
    ====================================================== */}

      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10">
        <div className="w-full max-w-[430px]">
          {/* =================================================
            BRAND
        ================================================== */}

          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 text-white shadow-[0_10px_30px_rgba(249,115,22,0.22)]">
              <span className="text-lg font-bold">K</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-[#29251F]">
              Welcome back
            </h1>

            <p className="mt-1.5 text-sm text-[#918980]">
              Your workspace is waiting for you.
            </p>
          </div>

          {/* =================================================
            LOGIN CARD
        ================================================== */}

          <div className="rounded-3xl border border-black/[0.06] bg-[#FFFDF9] p-6 shadow-[0_24px_70px_rgba(80,60,30,0.10)] sm:p-7">
            {/* Small top label */}

            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-orange-500">
                  Sign in
                </p>

                <p className="mt-1 text-xs text-[#AAA199]">
                  Continue to your workspace
                </p>
              </div>

              <div className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-600">
                  Secure
                </span>
              </div>
            </div>

            {/* =================================================
              FORM
          ================================================== */}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}

              <div>
                <label className="mb-1.5 block text-[11px] font-semibold text-[#6F675F]">
                  Email address
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-black/[0.07] bg-[#F9F7F3] px-4 py-3 text-sm text-[#29251F] outline-none transition-all placeholder:text-[#B7B0A8] focus:border-orange-300 focus:bg-white focus:ring-4 focus:ring-orange-100/60"
                />
              </div>

              {/* Password */}

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-[11px] font-semibold text-[#6F675F]">
                    Password
                  </label>
                </div>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-black/[0.07] bg-[#F9F7F3] px-4 py-3 text-sm text-[#29251F] outline-none transition-all placeholder:text-[#B7B0A8] focus:border-orange-300 focus:bg-white focus:ring-4 focus:ring-orange-100/60"
                />
              </div>

              {/* Error */}

              {error && (
                <div className="rounded-xl border border-red-100 bg-red-50 px-3.5 py-3">
                  <p className="text-xs font-medium text-red-500">{error}</p>
                </div>
              )}

              {/* Login */}

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#29251F] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-orange-500 hover:shadow-[0_8px_25px_rgba(249,115,22,0.20)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span>{loading ? "Logging in..." : "Enter workspace"}</span>

                {!loading && (
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                )}
              </button>
            </form>

            {/* =================================================
              REGISTER
          ================================================== */}

            <div className="mt-6 border-t border-black/[0.05] pt-5 text-center">
              <p className="text-xs text-[#9A9289]">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/auth/register")}
                  className="font-semibold text-orange-500 transition hover:text-orange-600"
                >
                  Create one
                </button>
              </p>
            </div>
          </div>

          {/* =================================================
            FOOTER
        ================================================== */}

          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />

            <p className="text-[10px] font-medium tracking-wide text-[#AAA199]">
              Your personal productivity space
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

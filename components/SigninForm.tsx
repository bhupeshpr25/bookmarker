import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

export function SigninForm() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleLogin = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      setEmailSent(true);
    } catch (error: any) {
      console.error(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {emailSent ? (
        <div className="text-lg text-center mt-32 text-gray-200 font-semibold">
          <p>An e-mail has been sent to your e-mail address.</p>
          <p>Please click the link in the e-mail to sign in.</p>
          <p className="mt-4">
            <button
              className="text-cyan-500"
              onClick={() => setEmailSent(false)}
            >
              send again
            </button>
          </p>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin(email);
          }}
          className="flex items-center justify-center flex-col space-y-3 mt-32"
        >
          <p className="text-gray-200 text-2xl font-bold mb-4">
            Sign in with magic link
          </p>
          <div>
            <div>
              <input
                id="email"
                className="rounded-md w-72 p-2 border-cyan-600 border-1"
                type="email"
                placeholder="Your email"
                value={email}
                required
                disabled={loading}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="p-3 bg-cyan-800 text-gray-100 hover:bg-cyan-600 rounded-md"
              disabled={loading}
            >
              <span>{loading ? "Processing…" : "Send magic link"}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

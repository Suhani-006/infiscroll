import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDzK3dawU4u5_GDM6HX4InTkAMFW2A6Ers",
  authDomain: "feed-flow-control-app.firebaseapp.com",
  projectId: "feed-flow-control-app",
  storageBucket: "feed-flow-control-app.firebasestorage.app",
  messagingSenderId: "687818733040",
  appId: "1:687818733040:web:f566954dfe4858707cd935",
  measurementId: "G-2YPL0JRBN6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

function Login({ redirectTo = "/" }) {
  // Force theme to light on login page
  React.useEffect(() => {
    localStorage.setItem('theme-dark', 'false');
    document.body.classList.add('light-theme');
    document.body.classList.remove('dark-theme');
    document.body.style.background = '#fff';
    document.body.style.color = '#222';
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const [avatar, setAvatar] = React.useState(null);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setAvatar(user.photoURL);
      localStorage.setItem('user', JSON.stringify({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      }));
      // Always redirect to select-categories after login
      navigate(redirectTo, { replace: true });
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: window.innerWidth < 768 ? 'column' : 'row',
      minHeight: '100vh',
      fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
    }}>
      {/* Left Image Section */}
      {window.innerWidth >= 768 && (
        <div style={{
          flex: 1,
          width: '50%',
          backgroundColor: '#fafafa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 40,
        }}>
          <img
            src="/premium_photo-1720192861939-f469be34d5d7.avif"
            alt="User with laptop"
            style={{
              width: '90%',
              maxWidth: 400,
              height: 'auto',
              borderRadius: 12,
              objectFit: 'contain',
            }}
          />
        </div>
      )}

      {/* Right Login Section */}
      <div style={{
        flex: 1,
        width: window.innerWidth < 768 ? '100%' : '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f4f7fe',
        padding: 20,
      }}>
        <div style={{
          width: '100%',
          maxWidth: 420,
          background: '#fff',
          borderRadius: 22,
          boxShadow: '0 8px 32px #a259ff18, 0 1.5px 8px #0001',
          padding: '40px 28px 32px 28px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 28,
        }}>
          {/* Logo and App Name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: 18,
              background: 'linear-gradient(135deg, #a259ff 0%, #f24e1e 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="16" fill="#fff" />
                <polygon points="13,10 24,16 13,22" fill="#a259ff" />
              </svg>
            </div>
            <span style={{
              fontWeight: 800,
              fontSize: 28,
              background: 'linear-gradient(90deg, #a259ff 0%, #f24e1e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              userSelect: 'none',
            }}>
              infiScroll
            </span>
          </div>

          {/* Title */}
          <div style={{
            fontWeight: 800,
            fontSize: 28,
            color: '#181c32',
            textAlign: 'center',
          }}>
            Welcome to infiScroll
          </div>

          {/* Subtitle */}
          <div style={{
            fontSize: 17,
            color: '#6b7280',
            textAlign: 'center',
            fontWeight: 400,
          }}>
            Discover endless content tailored for you
          </div>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            style={{
              background: '#fff',
              color: '#3c4043',
              border: '1.5px solid #dadce0',
              borderRadius: 8,
              padding: '0 16px',
              height: 48,
              fontSize: 16,
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              width: '100%',
              minWidth: 220,
              marginTop: 10,
              transition: 'box-shadow 0.15s, border 0.15s',
            }}
            onMouseOver={e => (e.currentTarget.style.boxShadow = '0 1px 4px #a259ff11')}
            onMouseOut={e => (e.currentTarget.style.boxShadow = 'none')}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Google_Favicon_2025.svg/800px-Google_Favicon_2025.svg.png"
              alt="Google G"
              style={{ width: 22, height: 22, borderRadius: 2 }}
              draggable={false}
            />
            <span style={{ fontSize: 16, fontWeight: 500 }}>
              Continue with Google
            </span>
          </button>

          {/* Terms */}
          <div style={{
            fontSize: 13.5,
            color: '#8b95a1',
            textAlign: 'center',
            marginTop: 18,
            lineHeight: 1.6,
            fontWeight: 400,
            maxWidth: 320,
          }}>
            By continuing, you agree to our{' '}
            <a href="#" style={{ color: '#7b3ff2', textDecoration: 'underline' }}>Terms of Service</a> and{' '}
            <a href="#" style={{ color: '#7b3ff2', textDecoration: 'underline' }}>Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

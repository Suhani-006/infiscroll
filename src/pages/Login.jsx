import React from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDzK3dawU4u5_GDM6HX4InTkAMFW2A6Ers",
  authDomain: "feed-flow-control-app.firebaseapp.com",
  projectId: "feed-flow-control-app",
  storageBucket: "feed-flow-control-app.firebasestorage.app",
  messagingSenderId: "687818733040",
  appId: "1:687818733040:web:f566954dfe4858707cd935",
  measurementId: "G-2YPL0JRBN6"
};

// Firebase Init
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

function Login({ redirectTo = "/" }) {
  const navigate = useNavigate();

  React.useEffect(() => {
    localStorage.setItem('theme-dark', 'false');
    document.body.classList.add('light-theme');
    document.body.classList.remove('dark-theme');
    document.body.style.background = '#fff';
    document.body.style.color = '#222';
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      localStorage.setItem('user', JSON.stringify({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      }));
      navigate(redirectTo, { replace: true });
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
      background: 'linear-gradient(135deg, #f0f4ff 0%, #ffffff 100%)', backgroundAttachment: 'fixed',
    }}>

      <div style={{
        display: 'flex',
        flexDirection: window.innerWidth < 768 ? 'column' : 'row',
        minHeight: '100vh',
        fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
background: 'linear-gradient(135deg, #a259ff 0%, #f24e1e 100%)',
        backgroundAttachment: 'fixed',
      }}>

        {/* Left Section */}
        {window.innerWidth >= 768 && (
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px',
          }}>
            <img
              src="/premium_photo-1720192861939-f469be34d5d7.avif"
              alt="Visual"
              style={{
                width: '90%',
                maxWidth: 440,
                borderRadius: 18,
                boxShadow: '0 4px 20px rgb(255, 255, 255)',
                objectFit: 'cover',
              }}
            />
          </div>
        )}

        {/* Right Login Box */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
        }}>
          <div style={{
            width: '100%',
            maxWidth: 420,
            background: 'rgba(255, 255, 255, 0.42)',
            borderRadius: 24,
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            padding: '42px 32px',
            boxShadow: '0 8px 32pxrgba(161, 89, 255, 0.84), 0 2px 12pxrgb(0, 0, 0)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
          }}>

            {/* App Icon and Name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 58,
                height: 58,
                borderRadius: 18,
                background: 'linear-gradient(135deg, #a259ff 0%, #f24e1e 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              }}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="16" fill="#fff" />
                  <polygon points="13,10 24,16 13,22" fill="#a259ff" />
                </svg>
              </div>
              <span style={{
                fontWeight: 800,
                fontSize: 28,
                background: 'linear-gradient(90deg, #a259ff, #f24e1e)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                userSelect: 'none',
              }}>
                infiScroll
              </span>
            </div>

            {/* Heading */}
            <div style={{
              fontWeight: 700,
              fontSize: 24,
              color: '#181c32',
              textAlign: 'center',
            }}>
              Welcome to infiScroll
            </div>

            {/* Subtitle */}
            <div style={{
              fontSize: 16,
              color: 'black',
              textAlign: 'center',
              fontWeight: 400,
              lineHeight: 1.5,
            }}>
              Discover endless content tailored just for you.
            </div>

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              style={{
background: 'linear-gradient(135deg, rgba(162,89,255,0.13), rgba(242,78,30,0.13))',
                color: 'black',
                border: '1.5px solidrgb(176, 202, 255)',
                borderRadius: 10,
                padding: '0 18px',
                height: 48,
                fontSize: 16,
                fontWeight: 550,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                width: '100%',
                transition: 'all 0.2s',
              }}
              onMouseOver={e => e.currentTarget.style.boxShadow = '0 2px 8px #0002'}
              onMouseOut={e => e.currentTarget.style.boxShadow = 'none'}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Google_Favicon_2025.svg/800px-Google_Favicon_2025.svg.png"
                alt="Google"
                style={{ width: 22, height: 22, borderRadius: 2 }}
                draggable={false}
              />
              Continue with Google
            </button>

            {/* Terms */}
            <div style={{
              fontSize: 13.5,
              color: 'black',
              textAlign: 'center',
              marginTop: 10,
              lineHeight: 1.6,
              fontWeight: 400,
              maxWidth: 320,
            }}>
              By continuing, you agree to our{' '}
              <a href="#" style={{ color: '#7b3ff2', textDecoration: 'underline' }}>Terms of Service</a>{' '}
              and{' '}
              <a href="#" style={{ color: '#7b3ff2', textDecoration: 'underline' }}>Privacy Policy</a>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

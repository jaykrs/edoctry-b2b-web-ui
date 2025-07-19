'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      router.replace('/admin'); 
    } else {
      router.replace('/signin'); // Signin page URL
    }
  }, [router]);

  return null;
}

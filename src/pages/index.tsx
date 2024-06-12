// src/pages/index.js

import React from 'react';
import Link from 'next/link';
import Leaderboard from '../components/Leaderboard';

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Leaderboard />
      <Link href="/photos">Go to Photos</Link>
    </div>
  );
}

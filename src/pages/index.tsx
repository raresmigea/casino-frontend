import React from 'react';
import Link from 'next/link';
import Leaderboard from '../components/Leaderboard';

export default function Home() {
  return (
    <div>
      <Leaderboard />
      <Link href="/photos">
        <button className="mt-4 button">Go to Photos</button>
      </Link>
    </div>
  );
}
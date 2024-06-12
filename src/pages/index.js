import Link from 'next/link';
import Leaderboard from '../components/Leaderboard';
import Photos from '../components/Photos';

export default function Home() {
  return (
    <div>
      <Leaderboard />
      <Link href="/photos">Go to Photos</Link>
    </div>
  );
}

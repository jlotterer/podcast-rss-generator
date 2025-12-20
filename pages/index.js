import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { Loader2 } from 'lucide-react';
import ProtectedPage from '../components/ProtectedPage';

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      // Redirect authenticated users to the podcasts page
      router.push('/podcasts');
    }
  }, [status, router]);

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Redirecting to your podcasts...</p>
        </div>
      </div>
    </ProtectedPage>
  );
}

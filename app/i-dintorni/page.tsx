import { Suspense } from 'react';
import { DintorniExplorer } from '@/components/dintorni-explorer';

export default function DintorniPage() {
  return (
    <Suspense>
      <DintorniExplorer />
    </Suspense>
  );
}

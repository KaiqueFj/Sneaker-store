import { getUsersReviewsAction } from '@/actions/reviews-action';
import { getSneakerDetailsServiceAction } from '@/actions/sneakers-action';
import SneakerSelectedInformation from '@/app/_components/products/Details/sneakerSelectedInformation';

import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!slug) {
    return notFound();
  }

  const id = slug.split('-')[0];

  const sneakerDetails = await getSneakerDetailsServiceAction(id);

  if (!sneakerDetails) {
    return notFound();
  }

  const reviews = await getUsersReviewsAction(id);

  return (
    <div className="w-full justify-items-center">
      <SneakerSelectedInformation sneaker={sneakerDetails} reviews={reviews} />
    </div>
  );
}

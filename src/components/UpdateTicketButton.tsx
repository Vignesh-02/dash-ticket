'use client';

import Link from 'next/link';

const UpdateTicketButton = ({ ticketId }: { ticketId: number }) => {
  return (
    <Link
      href={`/tickets/${ticketId}/update`}
      className="inline-block mt-2 mx-2 text-sm px-3 py-1 rounded transition text-center
                 bg-yellow-500 text-white hover:bg-yellow-600 cursor-pointer"
    >
      Update
    </Link>
  );
};

export default UpdateTicketButton;

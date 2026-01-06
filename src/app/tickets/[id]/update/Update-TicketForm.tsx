'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { updateTicket } from '@/app/actions/tickets.actions';
import { toast } from 'sonner';
import type { Ticket } from '@/generated/prisma/client';

const UpdateTicketForm = ({ ticket }: { ticket: Ticket }) => {
  const [state, formAction] = useActionState(updateTicket, {
    success: false,
    message: '',
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success('Ticket updated successfully!');
      router.push(`/tickets`);
    }
  }, [state.success, router, ticket.id]);

  return (
    <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8 border border-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Update Ticket
      </h1>

      {state.message && !state.success && (
        <p className="text-red-500 mb-4 text-center">
          {state.message}
        </p>
      )}

      <form action={formAction} className="space-y-4 text-gray-700">
        {/* Hidden ID */}
        <input type="hidden" name="ticketId" value={ticket.id} />

        <input
          className="w-full border border-gray-200 p-3 rounded
                     focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          name="subject"
          defaultValue={ticket.subject}
          placeholder="Subject"
        />

        <textarea
          className="w-full border border-gray-200 p-3 rounded
                     focus:outline-none focus:ring-2 focus:ring-blue-400"
          name="description"
          defaultValue={ticket.description}
          placeholder="Describe your issue"
          rows={4}
        />

        <select
          className="w-full border border-gray-200 p-3 rounded
                     focus:outline-none focus:ring-2 focus:ring-blue-400"
          name="priority"
          defaultValue={ticket.priority}
        >
          <option value="Low">Low Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="High">High Priority</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded
                     cursor-pointer hover:bg-blue-700 transition
                     disabled:opacity-50"
        >
          Update Ticket
        </button>
      </form>
    </div>
  );
};

export default UpdateTicketForm;

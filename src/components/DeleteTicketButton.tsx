'use client';

import { useActionState, useEffect, useState } from 'react';
import { deleteTicket } from '@/app/actions/tickets.actions';
import { toast } from 'sonner';
import { createPortal } from 'react-dom';


const DeleteTicketButton = ({ ticketId }: { ticketId: number }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const initialState = {
    success: false,
    message: '',
  };

  const [state, formAction] = useActionState(deleteTicket, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      setShowConfirm(false);
    } else if (state.message && !state.success) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <>
      {/* Delete Button */}
      <button
        type="button"
        onClick={() => setShowConfirm(true)}
        className="inline-block mt-2 mx-6 text-sm px-3 py-1 rounded transition text-center
                   bg-red-600 text-white hover:bg-red-700 cursor-pointer"
      >
        Delete
      </button>

      {/* Confirmation Modal */}
      {showConfirm &&
  createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 opacity-100">
        <h3 className="text-lg font-semibold mb-2 text-gray-900">
          Confirm Delete
        </h3>

        <p className="text-sm text-gray-600 mb-4">
          Are you sure you want to delete this ticket? This action cannot be
          undone.
        </p>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setShowConfirm(false)}
            className="px-3 py-1 rounded border cursor-pointer"
          >
            Cancel
          </button>

          <form action={formAction}>
            <input type="hidden" name="ticketId" value={ticketId} />
            <button
              type="submit"
              className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 cursor-pointer"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    </div>,
    document.body
  )}

    </>
  );
};

export default DeleteTicketButton;

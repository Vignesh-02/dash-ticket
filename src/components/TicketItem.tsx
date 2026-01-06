"use client";

import Link from "next/link";
import { getPriorityClass } from "@/utils/ui";
import type { Ticket } from "@/generated/prisma/client";
import DeleteTicketButton from "./DeleteTicketButton";
import UpdateTicketButton from "./UpdateTicketButton";

type TicketItemProps = {
    ticket: Ticket;
};

const TicketItem = ({ ticket }: TicketItemProps) => {
    const isClosed = ticket.status === "Closed";

    // const [showConfirm, setShowConfirm] = useState<boolean>(false);

    // const handleDelete = () => {
    //     // 👉 call your delete API / server action here
    //     console.log("Deleting ticket:", ticket.id);
    //     setShowConfirm(false);
    // };

    return (
        <>
            <div
                key={ticket.id}
                className={`flex justify-between items-center bg-white rounded-lg shadow border border-gray-200 p-6 ${
                    isClosed ? "opacity-50" : ""
                }`}
            >
                {/* Left Side */}
                <div>
                    <h2 className="text-xl font-semibold text-blue-600">
                        {ticket.subject}
                    </h2>
                </div>
                {/* Right Side */}
                <div className="text-right space-y-2">
                    <div className="text-sm text-gray-500">
                        Priority:{" "}
                        <span className={getPriorityClass(ticket.priority)}>
                            {ticket.priority}
                        </span>
                    </div>
                    {/* <button
                        onClick={() => setShowConfirm(true)}
                        className={`inline-block mx-6 mt-2 text-sm px-3 py-1 rounded transition text-center
              bg-red-600 text-white
              hover:bg-red-700
              active:bg-red-800]
              cursor-pointer`}
                    >
                        Delete
                    </button> */}
                    <UpdateTicketButton ticketId={ticket.id} />
                    <DeleteTicketButton  ticketId={ticket.id} />


                    <Link
                        href={`/tickets/${ticket.id}`}
                        className={`inline-block mt-2 text-sm px-3 py-1 rounded transition text-center ${
                            isClosed
                                ? "bg-gray-400 text-gray-700 cursor-not-allowed pointer-events-none"
                                : "bg-blue-600 text-white hover:bg-blue-700 "
                        }`}
                    >
                        View Ticket
                    </Link>
                </div>
            </div>

            {/* Confirmation Modal */}
            {/* {showConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-80">
                        <h3 className="text-lg font-semibold mb-2">
                            Confirm Delete
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Are you sure you want to delete this ticket?
                        </p>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-3 py-1 rounded border cursor-pointer"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleDelete}
                                className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )} */}
        </>
    );
};

export default TicketItem;

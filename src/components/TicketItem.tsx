"use client";

import Link from "next/link";
import { getPriorityClass } from "@/utils/ui";
import type { Ticket, User } from "@/generated/prisma/client";
import DeleteTicketButton from "./DeleteTicketButton";
import UpdateTicketButton from "./UpdateTicketButton";

type TicketWithUser = Ticket & {
    user?: Pick<User, "name" | "email">;
};

type TicketItemProps = {
    ticket: TicketWithUser;
    isAdmin: boolean;
};

const TicketItem = ({ ticket, isAdmin }: TicketItemProps) => {
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
                className={`flex flex-row flex-wrap justify-between items-center bg-white rounded-lg shadow border border-gray-200 px-4 py-3 sm:px-6 ${
                    isClosed ? "opacity-50" : ""
                }`}
            >
                {/* Left Side */}

                <div className="flex flex-col sm:flex-row   flex-wrap items-center gap-3 min-w-0 flex-1 mt-14">
                    <h2 className="text-xl font-semibold text-blue-600 sm:text-lg max-w-full truncate">
                        {ticket.subject}
                    </h2>

                    {isAdmin && ticket.user?.name && (
                        <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded truncate">
                        {ticket.user.name}
                        </span>
                    )}
                </div>
                {/* Right Side */}
                <div className="flex flex-col justify-between items-end gap-2 space-y-2">
                    <div className="text-sm text-gray-500 px-3 py-1" >
                        Priority:{" "}
                        <span className={getPriorityClass(ticket.priority)}>
                            {ticket.priority}
                        </span>
                    </div>

                    
                <div className="flex items-center gap-1 sm:gap-3">

                    <UpdateTicketButton ticketId={ticket.id} />
                    <DeleteTicketButton ticketId={ticket.id} />

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
            </div>
        </>
    );
};

export default TicketItem;

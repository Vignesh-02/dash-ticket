import { getTickets } from "../actions/tickets.actions";
import { getCurrentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";
import TicketItem from "@/components/TicketItem";


const TicketsPage = async () => {

    const user = await getCurrentUser();

    if(!user){
        redirect('/login');
    }

    const tickets = await getTickets();
    console.log(tickets);



    return ( 
        <div className="min-h-screen bg-blue-50 p-8">
            <h1 className="text-3xl font-bold text-blue-600 
            mb-8 text-center">
                Dash Tickets
            </h1>

            { tickets.length === 0 ? (
                <p className="text-center text-gra">
                    No Tickets yet
                </p>
            ) : (
                <div className="space-y-4 max-3-yl mx-auto">
                    { tickets.map((ticket) => (
                        <TicketItem key={ticket.id} ticket={ticket} />
                    ))}
                </div>
            )}
        </div>
     );
}
 
export default TicketsPage;
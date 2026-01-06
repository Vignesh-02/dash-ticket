import UpdateTicketForm from './Update-TicketForm';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/current-user';
import { getTicketById } from "@/app/actions/tickets.actions";
import { notFound } from "next/navigation";

const UpdateTicketPage = async (props: {
    params: Promise<{id: string}>
}) => {
  const user = await getCurrentUser();

   const { id } = await props.params;
      const ticket = await getTicketById(id);
  
      if(!ticket){
          notFound();
      }

  if (!user) {
    redirect('/login');
  }

  return (
    <div className='min-h-screen bg-blue-50 flex items-center justify-center px-4'>
      <UpdateTicketForm ticket={ticket}/>
    </div>
  );
};

export default UpdateTicketPage;

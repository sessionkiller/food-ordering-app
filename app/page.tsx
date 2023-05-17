import AddProduct from '@/components/AddProduct'
import Featured from '@/components/Featured'
import PizzaList from '@/components/PizzaList'
import { cookies } from 'next/headers';

export default async function Home() {

  const cookieStore = cookies();
  const token = cookieStore.get('token');
  let isAdmin = false;

  if (token?.value === process.env.TOKEN) {
    isAdmin = true;
  }

  return (
    <main>
      <Featured/>
      {isAdmin && <AddProduct />}
      <PizzaList/>
    </main>
  )
}

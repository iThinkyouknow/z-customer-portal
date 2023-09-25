import type { NextPage } from "next";
import useSWR from 'swr';
import { ButtonPrimary } from "@/components/ButtonPrimary";
import { useSession, signOut } from "next-auth/react"
import Image from 'next/image';
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { selectNameFilter, setFirstName, setLastName } from "@/store/nameFilterSlice";

const fetcher = (...args) => fetch(...args).then(res => res.json());

const Portal: NextPage = () => {
    const nameFilter = useSelector(selectNameFilter);
    const dispatch = useDispatch();

    const {status} = useSession();
    const {data, isLoading, mutate} = useSWR('/api/users', fetcher);
    
    const router = useRouter();
    const logOut = () => {
        signOut({callbackUrl: '/'});
        
    };
    
    if (status === 'unauthenticated') {
        router.replace('/not-signed-in');
        return null;
    } else if (status === 'loading') {
        return (
            <div>Loading...</div>
        )
    }

    const showEmail = (userId: number) => async () => {
        const query = new URLSearchParams();
        query.append('userId', `${userId}`);
        const res = await fetch(`/api/unmask-email?${query.toString()}`);
        const {email} = await res.json();
        if (email) {
            const userIndex = data.findIndex(({id}) => userId === id);
            if (~userIndex) {
                const newUserData = {...data[userIndex], email}
                const newData = [...data.slice(0, userIndex), newUserData, ...data.slice(userIndex + 1)]
                mutate(newData, {revalidate: false});
            }

        }
    }
    
    const users = Array.isArray(data) 
        ? data
            .filter(({first_name: firstName, last_name: lastName}: {first_name: string, last_name:string}) => {
                const [
                    firstNameLower, 
                    lastNameLower, 
                    firstNameFilterLower, 
                    lastNameFilterLower
                ] = [
                    firstName, 
                    lastName,
                    nameFilter.firstName,
                    nameFilter.lastName
                ].map(x => x.toLowerCase())

                if (!lastNameFilterLower) return firstNameLower.startsWith(firstNameFilterLower)
                if (!firstNameFilterLower) return lastNameLower.startsWith(lastNameFilterLower)
                return firstNameLower.startsWith(firstNameFilterLower) || lastNameLower.startsWith(lastNameFilterLower)
            })
            .map((user: UsersApiResponseData) => {
                const fullName = `${user.first_name} ${user.last_name}`;
                return (
                    <div className="grid grid-cols-4 gap-8 items-center border rounded-xl overflow-hidden" key={fullName}>
                        <div className=" justify-center w-32 h-32 relative">
                            <Image src={user.avatar} alt={fullName} fill={true} className="object-cover" />
                        </div>
                        <div>
                            <p>{fullName}</p>
                        </div>
                        <div>
                            <p>{user.email}</p>
                        </div>
                        <div className="w-48 h-12">
                            <ButtonPrimary onClick={showEmail(user.id)}>Show Email</ButtonPrimary>
                        </div>
                    </div>
                )
            })
        : null;

        const setFirstNameFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setFirstName(e.target.value))
        }
        const setLastNameFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setLastName(e.target.value))
        }

    return (
        <>
            <Header>
                <ButtonPrimary onClick={logOut}>
                    Log Out
                </ButtonPrimary>
            </Header>
            <main className="p-12">
               <h2 className="text-6xl">Users</h2>
               <div className="">

               <div className="grid grid-cols-4 gap-8 items-center font-bold ">
                <span></span>
                <div className="flex gap-2 items-center">
                    <span>Name</span>
                    <input type="text" className="border border-blue-500 rounded w-1/3 p-1" placeholder="Filter: First" onChange={setFirstNameFilter} value={nameFilter.firstName} />
                    <input type="text" placeholder="Filter: Last" className="border border-blue-500 rounded w-1/3 p-1" onChange={setLastNameFilter} value={nameFilter.lastName} />
                
                </div>
                <span>Email</span>
                <span>Action</span>
               </div>
                {
                    isLoading ? <div>Loading...</div>: null
                }
               <div className="flex flex-col gap-4 mt-8 ">
                {users}
               </div>
               </div>
            </main>
            <Footer>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                </ul>
            </Footer>
        </>
        
    );
}

export default Portal;
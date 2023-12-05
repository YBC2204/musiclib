import { UserDetails } from "@/types";
import { User ,useSessionContext ,useUser as useSupaUser} from "@supabase/auth-helpers-react"
import { useEffect, useState, createContext, useContext } from "react";


type UserContextType = {
    accessToken: string | null;
    user: User | null;
    userDetails: UserDetails | null;
    isLoading: boolean;
    // subscription: Subscription | null;
  };

  export const UserContext = createContext<UserContextType | undefined>(
    undefined
  );

  export interface Props {
    [propName: string]: any;
  }

  export const MyUserContextProvider = (props: Props) => {
    const {
      session,
      isLoading: isLoadingUser,
      supabaseClient: supabase
    } = useSessionContext();

    const user = useSupaUser();
    const accessToken = session?.access_token ?? null;
    const [isLoadingData, setIsloadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
//   const [subscription, setSubscription] = useState<Subscription | null>(null);
const getUserDetails = () => supabase.from('users').select('*').single();
const getSubscription = () => null; // No need for subscription logic

useEffect(() => {
  if (user && !isLoadingData && !userDetails) {
    setIsloadingData(true);
    getUserDetails()
      .then((userDetailsData) => {
        setUserDetails(userDetailsData.data as UserDetails);
      })
      .finally(() => {
        setIsloadingData(false);
      });
  } else if (!user && !isLoadingUser && !isLoadingData) {
    setUserDetails(null);
  }
}, [user, isLoadingUser]);

const value = {
  accessToken,
  user,
  userDetails,
  isLoading: isLoadingUser || isLoadingData,
//   subscription: null, // No subscription data
};

return <UserContext.Provider value={value} {...props} />;


}
export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
      throw new Error(`useUser must be used within a MyUserContextProvider.`);
    }
    return context;
};






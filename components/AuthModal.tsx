"use client";

import React, { useEffect } from 'react';
import Modal from './Modal';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';  
import useAuthModal from "@/hooks/useAuthModal";

const Authmodal = () =>{
    
    const supabaseClient= useSupabaseClient();
    const { session } = useSessionContext();
    const router = useRouter();
    const { onClose, isOpen } = useAuthModal();
    
    useEffect(() => {
        if (session) {
          router.refresh();
          onClose();
        }
      }, [session, router, onClose]);

      
    const onChange = (open: boolean) => {
        if (!open) {
          onClose();
        }
      }
  
  return (
        <Modal title="Welcome back" 
         description="Login to your account." 
         isOpen={isOpen} 
         onChange={onChange}>
          
          <Auth
        supabaseClient={supabaseClient}
        providers={[]}
        
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#42A5F5'
              }
            }
          }
        }}
        theme="dark"
      />
        </Modal>
    )
}

export default Authmodal
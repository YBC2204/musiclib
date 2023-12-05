"use client";

import { useForm,FieldValues,SubmitHandler } from 'react-hook-form';
import Modal from './Modal';
import useUploadModal from '@/hooks/useUploadModal';
import {useState} from 'react'
import Input from './Input';
import Button from './Button';
import { useUser } from '@/hooks/useUser';
import uniqid from "uniqid";
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import {useRouter} from 'next/navigation'

const UploadModal = () =>
{
  const { user } = useUser();
  const uploadModal = useUploadModal();
  const [isLoading, setIsLoading] = useState(false);
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      song: null,
      image: null,
    }
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (values) =>
  {
    try {
      setIsLoading(true);
      
      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];
    
      if (!imageFile || !songFile || !user) {
        alert('Missing fields')
        return;
      }

      const uniqueID = uniqid();
//Song upload      
      const { 
        data: songData, 
        error: songError 
      } = await supabaseClient
        .storage
        .from('songs')
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: '3600',
          upsert: false
        });
        if (songError) {
          setIsLoading(false);
          return alert('Failed song upload');
        }
//Image upload
        const { 
          data: imageData, 
          error: imageError
        } = await supabaseClient
          .storage
          .from('images')
          .upload(`image-${values.title}-${uniqueID}`, imageFile, {
            cacheControl: '3600',
            upsert: false
          });
  
        if (imageError) {
          setIsLoading(false);
          return alert('Failed image upload');
        }

        //insert song to db

        const { error: supabaseError } = await supabaseClient
        .from('songs')
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path
        });

      if (supabaseError) {
        return alert(supabaseError.message);
      }
       
      router.refresh();
      setIsLoading(false);
      alert('Song created!');
      reset();
      uploadModal.onClose();
  }
  catch (error) {
    alert('Something went wrong');
  } finally {
    setIsLoading(false);
  }
} 


   return(
    <Modal
    title="Add a song"
    description="Upload an mp3 file"
    isOpen={uploadModal.isOpen}
    onChange={onChange}
  >
    <form onSubmit={handleSubmit(onSubmit)} 
    className='flex flex-col gap-y-4'>
    <Input
          id="title"
          disabled={isLoading}
          {...register('title', { required: true })}
          placeholder="Song title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register('author', { required: true })}
          placeholder="Song author"
        />
        <div>
          <div className="pb-1 my-2">
            Select a song file
          </div>
          <Input className='cursor-pointer'
            placeholder="test" 
            disabled={isLoading}
            type="file"
            accept=".mp3"
            id="song"
            {...register('song', { required: true })}
          />
        </div>
        <div>
          <div className="pb-1 my-2">
            Select an image
          </div>
          <Input  className='cursor-pointer'
            placeholder="test" 
            disabled={isLoading}
            type="file"
            accept="image/*"
            id="image"
            {...register('image', { required: true })}
          />
        </div>
        <Button disabled={isLoading} type="submit" className='bg-blue-800'>
          Create
        </Button>
    </form>
    </Modal>
   )

}

export default UploadModal


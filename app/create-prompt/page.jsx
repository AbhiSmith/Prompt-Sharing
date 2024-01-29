"use client"


import  { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const CreatePrompt = () => {
    const [submitting, setSubmitting] = useState(false)
    const [Post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    const CreatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        
        try {
            const response = await fetch('/api/prompt/new',
            {
                method: 'POST',
                body: JSON.stringify({
                    prompt: Post.prompt,
                    userId: session?.user.id,
                    tag: Post.tag,
                })
            })

            if(response.ok){
                Router.push("/")
            }
        } catch (error) {
            console.log("Error creating prompt: ", error.message);
        } finally {
            setSubmitting(false);
        }
    }

  return (
    <Form 
        type="Create"
        post={Post}
        setPost={setPost}
        submitting={setSubmitting}        
        CreatePrompt={CreatePrompt}        
    />
  )
}

export default CreatePrompt
"use client"

import  { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const CreatePrompt = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [submitting, setIsSubmitting] = useState(false);
    const [post, setPost] = useState({ prompt: "", tag: "" });


        const createPrompt = async (e) => {
            e.preventDefault();
            setIsSubmitting(true);
        
        try {       
            
            if (!post.prompt || !post.tag) {

                console.error("Prompt and tag must be provided.");
                return;
            }     

            const response = await fetch("/api/prompt/new", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  userId: session?.user.id,
                  prompt: post.prompt,                  
                  tag: post.tag,
                }),
              });
             
              if (response.ok) {
                router.push("/");
            } else {
                console.error("Failed to create prompt. Status:", response.status);
                // Optionally, log the response text for more details:
                console.error(await response.text());
            }
            
            
        } catch (error) {
            
            console.log("Error creating prompt: ", error.message);
        } 
        finally {
            setIsSubmitting(false);
        }
    }

  return (
        <Form 
        type='Create'
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}        
        />
  )
}

export default CreatePrompt
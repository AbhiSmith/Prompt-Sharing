import { connectToDb } from "@utils/database";
import Prompt from "@models/prompt";


export const POST = async (req) => {

    if (req.method !== "POST")
    return new Response("Method not allowed", { status: 405 }  )

    // In this code, await req.json() is used to parse the JSON body directly. 
    // This is a common approach in serverless functions provided by Vercel. 
    // Make sure to test this code with Postman or your preferred API 
    // testing tool to ensure that the request body is being processed correctly.
    
    // Parse the JSON body using await req.json()
    // const body = await req.json();
    
    const { userId, prompt, tag } = await req.json();    

    if (!userId || !prompt || !tag) {
        console.log("Missing required fields");
        return new Response("Missing required fields", { status: 400 });
    }
     
    try {
        await connectToDb();
        
        const newPrompt = new Prompt({ creator: userId, prompt, tag });

        await newPrompt.save();
        
        return new Response(JSON.stringify(newPrompt), {status: 201})        
    } catch (error) {
        if (error.name === 'ValidationError') {
            // Handle validation errors
            const errorMessage = Object.values(error.errors).map(e => e.message).join(', ');
            return new Response(`Validation error: ${errorMessage}`, { status: 400 });
        }
    
        console.error("Error creating prompt:", error);
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}
import { useEffect, useState, useTransition } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { useDocumentData } from "react-firebase-hooks/firestore"

function Document({id}: {id:string}) {
    const [data, loading, error] = useDocumentData(doc(db, "documents", id));
    const [input , setInput] = useState<string>("")
    const [isUpdating, startTransition] = useTransition()
    // const isOwner = useOwner()

    useEffect(() => {
        if(data){
            setInput(data.title)
        }
    }, [data])

    const updateTitle = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(input.trim()){
            startTransition(async () => {
                await updateDoc(doc(db, "documents", id), {
                    title: input,
                })
            })
        }
        
    }


  return (
    <div>
        <div className="flex max-w-5xl mx-auto justify-between pb-5">
            <form className="flex flex-1 space-x-2" onSubmit={updateTitle}>
                {/* Update title */}
                <Input 
                className="bg-white"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                />
                <Button disabled={isUpdating} type="submit" >{isUpdating? "Updating...." : "Update"}</Button>
                {/* If */}
                {/* Is owner && inviteUser , DeleteDocument */}

            </form>
        </div>

        <div>
            {/* {Manage Users} */}
            {/* Avatars */}
        </div>

        {/* Collaborative Editor */}
    </div>
  )
}
export default Document
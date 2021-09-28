/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/client"
import Image from "next/image";
import {
    VideoCameraIcon,
    CameraIcon
} from "@heroicons/react/solid"
import {
    EmojiHappyIcon
} from "@heroicons/react/outline"
import { useRef, useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc, serverTimestamp,updateDoc,doc} from "firebase/firestore";
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
function InputBox() {
    const [session]=useSession();
    const inputRef=useRef(null);
    const filePickerRef=useRef(null);
    const[imageToPost,setImageToPost]=useState(null);
    const sendPost=async (e)=>{
        e.preventDefault();
        if(!inputRef.current.value){
            return
        }
        var docData={
            message:inputRef.current.value,
            name:session.user.name,
            email:session.user.email,
            image:session.user.image,
            timestamp:serverTimestamp(),
        }
        await addDoc(collection(db, "posts"), docData)
        .then(async(document)=>{
            
            if(imageToPost){
                const metadata = {
                    contentType: 'image/jpg'
                    };

                    // Upload file and metadata to the object 'images/mountains.jpg'
                    const storageRef = ref(storage, 'images/' +document.id)
                    const uploadTask = uploadBytesResumable(storageRef, imageToPost, metadata);

                    // Listen for state changes, errors, and completion of the upload.
                    uploadTask.on('state_changed',
                    (snapshot) => {
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        }
                    }, 
                    (error) => {
                        console.error(error);
                    }, 
                    () => {
                        // Upload completed successfully, now we can get the download URL
                        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                            removeImage();
                            console.log('File available at', downloadURL);
                            await updateDoc(doc(db,"posts",document.id),{
                                postImage:downloadURL
                            },{
                                merge:true
                            }).then(()=>console.log("Success"))
                            .catch((error)=>console.error(error))
                        });
                    }
                );
            }
            inputRef.current.value="";
        })  
    }
    const addImageToPost=(e)=>{
        const reader= new FileReader();
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload=(readerEvent)=>{
            setImageToPost(readerEvent.target.result);
        }
    }
    const removeImage=()=>{
        setImageToPost(null);
    }
    return (
        <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
            <div className="flex space-x-4 p-4 items-center">
                <Image 
                    className="rounded-full"
                    src={session.user.image}
                    width={40}
                    height={40}
                    layout="fixed"
                    alt="profile pic"
                    />
                    <form className="flex flex-1">
                        <input className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
                         type="text" 
                         ref={inputRef}
                         placeholder={`What's on your mind, ${session.user.name}?`} 
                         />
                        <button hidden type="submit" onClick={sendPost}>Submit</button>
                    </form>
                    {imageToPost&&(
                        <div className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer" onClick={removeImage}>
                            <img className="h-10 object-contain" src={imageToPost} alt="Image to be posted" />
                            <p className="text-xs text-red-500 text-center">Remove</p>
                        </div>
                    )}
            </div>
            <div className="flex justify-evenly p-3 border-t">
                <div className="inputIcon">
                    <VideoCameraIcon className="h-7 text-red-500" />
                    <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
                </div>
                <div onClick={()=>filePickerRef.current.click()} className="inputIcon">
                    <CameraIcon className="h-7 text-green-400" />
                    <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
                    <input ref={filePickerRef} hidden type="file" onChange={addImageToPost} />
                </div>
                <div className="inputIcon">
                    <EmojiHappyIcon className="h-7 text-yellow-300" />
                    <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
                </div>
            </div>
        </div>
    )
}

export default InputBox

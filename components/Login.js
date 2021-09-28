/* eslint-disable jsx-a11y/alt-text */
import Image from 'next/image'
import {signIn} from 'next-auth/client'
function Login() {
    return (
        <div className="grid place-items-center">
            <Image 
            src="http://pngimg.com/uploads/facebook_logos/facebook_logos_PNG19750.png"
            height={200}
            width={200}
            objectFit="contain"
            />
            <h1 onClick={signIn} className="p-5 m-16 bg-blue-500 rounded-full text-center text-white cursor-pointer">Login with FaceBook</h1>

        </div>
    )
}

export default Login

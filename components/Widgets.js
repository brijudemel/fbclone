import { SearchIcon } from "@heroicons/react/outline"
import { DotsHorizontalIcon, VideoCameraIcon } from "@heroicons/react/solid"
import Contact from "./Contact"
const contacts=[
    {
        name:"Harvey Specter",
        src:"https://pbs.twimg.com/profile_images/720270636434763777/dB0QdPId.jpg",
    },
    {
        name:"Mike Ross",
        src:"https://pbs.twimg.com/profile_images/378800000115937647/71de097a6a0a20f64c0652ec79773cde_400x400.jpeg",
    },
    {
        name:"Jessica Pearson",
        src:"https://pbs.twimg.com/profile_images/761211889812643840/FTXSC_1a.jpg",
    },
    {
        name:"Donna Paulson",
        src:"https://pbs.twimg.com/profile_images/1350646854296477701/oJ09MBbD.jpg",
    },
    {
        name:"Louis Litt",
        src:"https://pbs.twimg.com/profile_images/2560335192/70czyhccooh8esiqaqfi_400x400.png",
    }
]
function Widgets() {
    return (
        <div className="hidden lg:flex flex-col w-60 p-2 mt-5">
            <div className="flex justify-between items-center text-gray-500 mb-5">
                <h2 className="text-xl">Contacts</h2>
                <div className="flex space-x-2">
                    <VideoCameraIcon className="h-6" />
                    <SearchIcon className="h-6" />
                    <DotsHorizontalIcon className="h-6" />
                </div>
            </div>
            {contacts.map(contact=>(
                <Contact key={contact.src} src={contact.src} name={contact.name} />
            ))}
        </div>
    )
}

export default Widgets


import StoryCard from "./StoryCard"
const stories=[
    {
        name:"Harvey Specter",
        src:"https://pbs.twimg.com/profile_images/720270636434763777/dB0QdPId.jpg",
        profile:"https://pbs.twimg.com/profile_images/720270636434763777/dB0QdPId.jpg"
    },
    {
        name:"Mike Ross",
        src:"https://pbs.twimg.com/profile_images/378800000115937647/71de097a6a0a20f64c0652ec79773cde_400x400.jpeg",
        profile:"https://pbs.twimg.com/profile_images/378800000115937647/71de097a6a0a20f64c0652ec79773cde_400x400.jpeg"
    },
    {
        name:"Jessica Pearson",
        src:"https://pbs.twimg.com/profile_images/761211889812643840/FTXSC_1a.jpg",
        profile:"https://pbs.twimg.com/profile_images/761211889812643840/FTXSC_1a.jpg"
    },
    {
        name:"Donna Paulson",
        src:"https://pbs.twimg.com/profile_images/1350646854296477701/oJ09MBbD.jpg",
        profile:"https://pbs.twimg.com/profile_images/1350646854296477701/oJ09MBbD.jpg"
    },
    {
        name:"Louis Litt",
        src:"https://pbs.twimg.com/profile_images/2560335192/70czyhccooh8esiqaqfi_400x400.png",
        profile:"https://pbs.twimg.com/profile_images/2560335192/70czyhccooh8esiqaqfi_400x400.png"
    }
]
function Stories() {
    return (
        <div className="flex justify-center space-x-3 mx-auto ">
            {stories.map(story=>(
                <StoryCard key={story.src} name={story.name} src={story.src} profile={story.profile} />
            ))}
        </div>
    )
}

export default Stories

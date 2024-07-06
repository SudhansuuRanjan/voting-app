import { useParams } from 'react-router-dom'
import { useState } from 'react';

const campaigns = [
    {
        name: "AI for Good",
        category: "AI",
        _id: "1",
        description: "AI for Good is a campaign to use AI to help people in need.",
        totalVoters: 100,
        expiresAt: "2022-12-31T23:59:59.999Z",
        status: "live",
        createdBy: "John Doe",
        creatorAvatar: "https://github.com/SudhansuuRanjan/twitter-spaces-frontend/blob/main/src/profile.png?raw=true",
        options: [
            {
                name: "Option 1",
                votes: 50
            },
            {
                name: "Option 2",
                votes: 50
            },
            {
                name: "Option 3",
                votes: 0
            }
        ]
    },
    {
        name: "Save the Whales",
        _id: "2",
        category: "Animals",
        description: "Save the Whales is a campaign to help save the whales.",
        totalVoters: 200,
        expiresAt: "2022-12-31T23:59:59.999Z",
        status: "upcoming",
        createdBy: "Jane Doe",
        creatorAvatar: "https://github.com/SudhansuuRanjan/twitter-spaces-frontend/blob/main/src/profile.png?raw=true",
        options: [
            {
                name: "Option 1",
                votes: 100
            },
            {
                name: "Option 2",
                votes: 100
            },
            {
                name: "Option 3",
                votes: 0
            }
        ]
    },
    {
        name: "Clean the Beach",
        _id: "3",
        category: "Environment",
        description: "Clean the Beach is a campaign to help clean the beach.",
        totalVoters: 300,
        expiresAt: "2022-12-31T23:59:59.999Z",
        status: "expired",
        createdBy: "John Smith",
        creatorAvatar: "https://github.com/SudhansuuRanjan/twitter-spaces-frontend/blob/main/src/profile.png?raw=true",
        options: [
            {
                name: "Option 1",
                votes: 150,
            },
            {
                name: "Option 2",
                votes: 150
            },
            {
                name: "Option 3",
                votes: 0
            }
        ]
    },
]

const Campaign = () => {
    const { campaignId } = useParams();
    const [campaign, setCampaign] = useState(
        campaigns.find(campaign => campaign._id === campaignId)
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Voted');
    }

    const handleChange = (e) => {
        console.log(e.target.value);
        const updatedCampaign = { ...campaign, options: campaign.options.map(option => option.name === e.target.value ? { ...option, votes: option.votes + 1 } : option) };
        setCampaign(updatedCampaign);
    }


    return (
        <div>

            <div key={campaign._id} className='flex flex-col w-full justify-center items-center'>
                <h1 className='text-black text-3xl font-bold'>{campaign.name}</h1>
                <p className='text-gray-800 text-lg text-center max-w-[38rem]'>{campaign.description}</p>

                <div className='flex gap-4 items-center justify-center my-2'>
                    <img src={campaign.creatorAvatar} alt="avatar" className='h-7 w-7 rounded-full' />
                    <p className='text-gray-700 font-medium'>{campaign.createdBy}</p>
                </div>


                <div className='font-medium text-center mt-5'>
                    <p className='text-gray-800'>Status: <span className='text-sky-500'>{campaign.status}</span></p>
                    <p className='text-gray-800'>Total Voters: <span className="text-gray-500">{campaign.totalVoters}</span></p>
                    <p className='text-gray-800'>Expires At: <span className="text-gray-500">
                        {
                            new Date(campaign.expiresAt).toLocaleString()
                        }
                    </span>
                    </p>
                </div>


                <div className='flex gap-3 items-center justify-center mt-10'>
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col justify-center items-center gap-5'>
                            {campaign.options.map((option, index) => (
                                <div key={index} className='flex gap-2 items-center justify-center'>
                                    <input className='hidden' type="radio" name="option" id={option.name} />
                                    <label onChange={handleChange} className='w-[32rem] border rounded-md p-2' htmlFor={option.name}>{option.name}</label>
                                </div>
                            ))}

                            <input type="submit" value="Vote" className='bg-sky-500 w-72 active:bg-sky-600 shadow text-white rounded-full px-4 py-2 mt-5 cursor-pointer' />
                        </div>

                    </form>

                </div>

            </div>

        </div>
    )
}

export default Campaign
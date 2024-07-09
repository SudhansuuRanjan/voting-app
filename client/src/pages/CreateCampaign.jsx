import React, { useState } from 'react'
import api from '../utils/api';

const CreateCampaign = () => {
    const categories = ['Technology', 'Health', 'Education', 'Environment', 'Human Rights', 'Animals', 'Arts', 'Sports', 'Community', 'AI', 'Career', 'Other']
    const [currentCandidate, setCurrentCandidate] = useState("");

    const [campaign, setCampaign] = useState({
        name: '',
        category: '',
        description: '',
        start_date: '',
        end_date: '',
        status: 'upcoming',
        candidates: [],
    });

    const createCampaign = async (e) => {
        e.preventDefault();

        if (campaign.name.length < 3) {
            alert('Name must be atleast 3 characters long');
            return;
        }

        if (campaign.start_date === null) {
            alert('Please select a valid start date');
            return;
        }

        if (campaign.end_date === null) {
            alert('Please select a valid end date');
            return;
        }

        if (campaign.start_date > campaign.end_date) {
            alert('End date must be after start date');
            return;
        }

        try {
            const formData = { ...campaign, candidates: [] };
            const response = await api.post('/campaigns', formData);

            console.log(response.data);

            if (response.data) {
                alert('Campaign created successfully');
                await addCandidates(response.data._id);
            }

            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const addCandidates = async (campaignId) => {
        try {
            const response = await api.post(`/candidates/bulk/${campaignId}`, { candidates: campaign.candidates });
            return response.data;
        } catch (error) {
            throw error;
        }
    }





    return (
        <div className='w-full'>
            <div className='flex flex-col w-full justify-center items-center'>
                <h1 className='text-3xl font-bold'>Create Campaign</h1>
                <form onSubmit={createCampaign} className='flex flex-col gap-4 w-1/2 mt-10'>
                    <div className='w-full'>
                        <label htmlFor='name'>Name</label>
                        <input className='border w-full p-2 rounded-md outline-none' type='text' id='name' name='name' value={campaign.name} onChange={(e) => setCampaign({ ...campaign, name: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor='category'>Category</label>
                        <select className='border w-full p-2 rounded-md outline-none' id='category' name='category' value={campaign.category} onChange={(e) => setCampaign({ ...campaign, category: e.target.value })}>
                            {categories.map(category => <option key={category} value={category}>{category}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor='description'>Description</label>
                        <textarea className='border w-full p-2 rounded-md outline-none' id='description' name='description' value={campaign.description} onChange={(e) => setCampaign({ ...campaign, description: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor='start_date'>Start Date</label>
                        <input className='border w-full p-2 rounded-md outline-none' type='date' id='start_date' name='start_date' value={campaign.start_date} onChange={(e) => setCampaign({ ...campaign, start_date: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor='end_date'>End Date</label>
                        <input className='border w-full p-2 rounded-md outline-none' type='date' id='end_date' name='end_date' value={campaign.end_date} onChange={(e) => setCampaign({ ...campaign, end_date: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor='status'>Status</label>
                        <select className='border w-full p-2 rounded-md outline-none' id='status' name='status' value={campaign.status} onChange={(e) => setCampaign({ ...campaign, status: e.target.value })}>
                            <option value='active'>Active</option>
                            <option value='inactive'>Inactive</option>
                            <option value='completed'>Completed</option>
                            <option value='upcoming'>Upcoming</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor='candidate'>Add Candidates</label>
                        <div className='flex w-full gap-2'>
                            <input value={currentCandidate} className='border w-full p-2 rounded-md outline-none' type='text' id='candidate' name='candidate' onChange={(e) => setCurrentCandidate(e.target.value)} />
                            <button onClick={(e) => {
                                e.preventDefault();
                                if (currentCandidate.length > 3) {
                                    setCampaign({ ...campaign, candidates: [...campaign.candidates, currentCandidate] });
                                    setCurrentCandidate("");
                                }
                            }} className='p-2 rounded-md bg-sky-500'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className='text-lg font-medium'>Current Candidates</label>
                        <ul className='flex flex-col w-full gap-1 mt-3'>
                            {campaign.candidates.length > 0 ?
                                campaign.candidates.map((candidate, index) => (
                                    <div key={index} className='flex justify-between bg-gray-100 px-2.5 py-1 rounded-md'>
                                        <li  >{index + 1}. <span className='font-medium'>{candidate}</span></li>
                                        <button onClick={(e) => {
                                            e.preventDefault();
                                            setCampaign({ ...campaign, candidates: campaign.candidates.filter((_, i) => i !== index) });
                                        }} className='text-red-500'>Remove</button>
                                    </div>
                                )) : <p className='text-gray-500'>No candidates added yet</p>
                            }
                        </ul>
                    </div>

                    <button className='bg-sky-500 focus:bg-sky-400 text-black font-medium py-2 px-4 rounded' type='submit'>Create Campaign</button>
                </form>

            </div>
        </div>
    )
}

export default CreateCampaign;
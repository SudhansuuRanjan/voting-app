import api from '../utils/api';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';


const HomePage = () => {

  const categories = ['All', 'Technology', 'Health', 'Education', 'Environment', 'Human Rights', 'Animals', 'Arts', 'Sports', 'Community', 'AI', 'Career', 'Other']

  const fetchCampaigns = async () => {
      const response = await api.get('/campaigns')
      return response.data;
  }

  const { isLoading, data, error } = useQuery({
    queryKey: ['campaigns'],
    queryFn: fetchCampaigns,
    staleTime: 1000 * 60 * 5,
  })

  return (
    <div>
      <div className='flex flex-col w-full justify-center items-center'>
        <div className='flex gap-4 items-center justify-center'>
          <input className='bg-gray-100 border border-gray-200 rounded-full outline-none px-4 font-medium py-2 w-72' placeholder='Search Campaigns' type="text" />
          <button className='bg-sky-500 active:bg-sky-600 shadow text-white rounded-full px-4 py-2' onClick={() => { }}>Search</button>
        </div>

        <div className='lg:w-[42rem] md:w-[32rem] px-5 mt-10'>
          <div className='flex flex-wrap gap-3 items-center justify-center'>
            {categories.map((category, index) => (
              <button key={index} className='border-[1.5px] border-sky-500 rounded-full hover:text-white hover:bg-sky-500 outline-none px-3 text-sky-500 text-sm font-medium py-1 transition-all ease-in-out' type="button">{category}</button>
            ))}
          </div>
        </div>

        <div className='flex gap-5 items-center justify-center mt-8'>
          <div className='font-medium flex gap-3 text-gray-500'>
            <button className='text-sky-500'>
              Live
            </button>
            <button>
              Upcoming
            </button>
            <button>
              Expired
            </button>
          </div>

          <div className='flex gap-2 items-center justify-center'>
            <p className='text-gray-400 font-medium'>
              Sort by:
            </p>
            <select className='border text-gray-600 border-gray-200 rounded-full outline-none text-sm px-2 font-medium py-0.5'>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="popular">Popular</option>
            </select>
          </div>
        </div>
      </div>


      <div className='flex items-center justify-center px-10 mt-10 flex-wrap gap-6'>
        {
          isLoading ? <p>Loading...</p> : data?.campaigns.map((campaign, index) => (
            <div className='bg-white p-2 rounded-3xl border lg:w-96 md:w-[28rem] w-full border-slate-200' key={campaign._id}>
              <Link to={`/campaign/${campaign._id}`}>
                <div className='bg-slate-100 rounded-2xl p-2'>
                  <h3 className='font-bold'>
                    {campaign.name}
                  </h3>

                  <p className='text-sky-600 text-sm font-medium'>
                    {campaign.category} . <span className='text-gray-600'>
                      {campaign.total_votes} votes polled
                    </span>
                  </p>

                  <p className='text-gray-500 text-sm pb-2 pt-1'>
                    {campaign.description}
                  </p>

                  <p className='bg-gray-300 rounded-lg w-fit text-sm font-medium px-2 py-0.5 text-gray-500'>
                    Expires on : {
                      new Date(campaign.end_date).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    }
                  </p>
                </div>
              </Link>

              <div className='flex gap-2 items-center justify-between py-2 pt-4'>
                <div className='flex gap-2 items-center'>
                  <img className='rounded-full w-8 h-8' src={campaign.createdBy.avatar} alt="avatar" />
                  <p className='text-gray-500 font-medium'>
                    {campaign.createdBy.name}
                  </p>
                </div>

                <div className='flex gap-2 items-center'>
                  <div className={`text-white ${campaign.status === 'live' ? 'bg-green-500' : campaign.status === 'upcoming' ? 'bg-orange-500' : 'bg-rose-500'} rounded-full px-3 py-0.5 text-sm font-medium`}>
                    {campaign.status}
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default HomePage;